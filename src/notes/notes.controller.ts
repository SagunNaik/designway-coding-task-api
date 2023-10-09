import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from 'src/auth/decorator/user.decorator';
import { IUserPayload } from 'src/users/interfaces/user-payload.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { routeConstant } from 'src/utilities/constant';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/utilities/roles.enum';


const { NOTES } = routeConstant;

@Controller(NOTES)
@ApiTags(NOTES)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  @Roles(Role.ADMIN, Role.USER)
  create(@Body() createNoteDto: CreateNoteDto, @User() user: IUserPayload) {
    return this.notesService.createNote(createNoteDto, user);
  }

  @Get()
  @Roles(Role.ADMIN, Role.USER)
  findAll(@User() user: IUserPayload) {
    return this.notesService.findAll(user);
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  findOne(@Param('id') id: string, @User() user: IUserPayload) {
    return this.notesService.findOne(+id, user);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto, @User() user: IUserPayload) {
    return this.notesService.update(+id, updateNoteDto, user);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER)
  remove(@Param('id') id: string, @User() user: IUserPayload) {
    return this.notesService.remove(+id, user);
  }

  @Get("/shared/:id")
  sharedNote(@Param('id') id: string, @User() user: IUserPayload) {
    return this.notesService.sharedNote(+id, user);
  }
}
