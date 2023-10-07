import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './entities/note.entity';
import { IUserPayload } from 'src/users/interfaces/user-payload.interface';
import { isArray } from 'src/utilities/helper';

@Injectable()
export class NotesService {

  constructor(
    @InjectRepository(Note)
    private readonly notesRepository: Repository<Note>,
  ) { }

  createNote(createNoteDto: CreateNoteDto, user: IUserPayload): Promise<Note> {
    try {
      const { content, isShared, title } = createNoteDto;

      const newNote: Note = new Note();

      newNote.content = content;
      newNote.title = title;
      newNote.isShared = isShared;
      newNote.createdOn = new Date();
      newNote.isActive = true;
      newNote.userId = user.userId;

      return this.notesRepository.save(newNote)


    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(user: IUserPayload): Promise<Note[]> {
    try {
      const notes = await this.notesRepository.find({
        where: [{ isActive: true, userId: user.userId }],
        select: {
          content: true,
          title: true,
          id: true,
          //userId: true,
          isShared: true,
          createdOn: true,
        },
        // relations: ['userId']
      });

      if (!isArray(notes)) {
        throw new HttpException("No notes available... dont worry you can create 1 now...", HttpStatus.NO_CONTENT);
      }

      return notes;

    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: number, user: IUserPayload): Promise<Note> {
    try {
      const note = await this.notesRepository.find({
        where: { isActive: true, id: id, userId: user.userId },
        select: {
          content: true,
          title: true,
          id: true,
          //userId: true,
          isShared: true,
          createdOn: true,
        },
        //relations: ['userId']
      });

      if (!note) {
        throw new HttpException("No note available... dont worry you can create 1 now...", HttpStatus.NO_CONTENT);
      }

      return note[0];


    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, updateNoteDto: UpdateNoteDto, user: IUserPayload) {
    try {
      const { content, isShared, title } = updateNoteDto;

      const noteTobeUpdated = await this.notesRepository.findOne({
        where: { isActive: true, id: id, userId: user.userId },
        // relations: ['userId']
      });

      if (!noteTobeUpdated) {
        throw new HttpException("Error while updating note...", HttpStatus.NO_CONTENT);
      }

      noteTobeUpdated.content = content ? content : noteTobeUpdated.content;
      noteTobeUpdated.title = title ? title : noteTobeUpdated.title;
      noteTobeUpdated.isShared = isShared ? isShared : noteTobeUpdated.isShared;

      return this.notesRepository.save(noteTobeUpdated)


    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number, user: IUserPayload) {
    try {


      const noteToBeDeleted = await this.notesRepository.findOne({
        where: { isActive: true, id: id, userId: user.userId },
        //relations: ['userId']
      });

      if (!noteToBeDeleted) {
        throw new HttpException("Error while deleting note...", HttpStatus.NO_CONTENT);
      }

      noteToBeDeleted.isActive = false;
      noteToBeDeleted.deletedOn = new Date();


      return this.notesRepository.save(noteToBeDeleted)


    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);
    }
  }

  async sharedNote(id: number, user: IUserPayload): Promise<Note> {
    try {
      const note = await this.notesRepository.find({
        where: { isActive: true, id: id, isShared: true },
        select: {
          content: true,
          title: true,
          id: true,
          // userId: true,
          isShared: true,
          createdOn: true,
        },
        // relations: ['userId']
      });

      if (!note) {
        throw new HttpException("Requested note is not available for viewing, Kindly contact Owner for access.", HttpStatus.FORBIDDEN);
      }

      return note[0];


    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);
    }
  }
}
