import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { hashString, isArray } from 'src/utilities/helper';
import { saltOrRound } from 'src/utilities/constant';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) { }


  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const { age, email, firstName, gender, lastName, password, username, role } = createUserDto;

      const user = await this.usersRepository.findOneBy(
        {
          email: email,
          isActive: true
        });

      if (user) throw new HttpException("User already exist with same Email !!!", HttpStatus.AMBIGUOUS);

      const hashedPassword = await hashString(password, saltOrRound);

      const newUser: User = new User();

      newUser.age = age;
      newUser.email = email;
      newUser.firstName = firstName;
      newUser.gender = gender;
      newUser.lastName = lastName;
      newUser.password = hashedPassword;
      newUser.username = username;
      newUser.role = role;
      newUser.isActive = true;

      return this.usersRepository.save(newUser);

    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);
    }

  }

  async findAllUser(): Promise<User[]> {

    try {

      const users = await this.usersRepository.find({
        where: { isActive: true },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          age: true,
          email: true,
          gender: true,
          username: true,
          role: true
        }
      });

      if (!isArray(users)) {
        throw new HttpException("No users exists...", HttpStatus.NO_CONTENT);
      }
      return users
    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);

    }
  }

  async findOneUser(id: number): Promise<User> {
    try {
      const users = await this.usersRepository.findOne({
        where: { isActive: true, id: id },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          age: true,
          email: true,
          gender: true,
          username: true,
          role: true
        }
      });

      if (!users) {
        throw new HttpException("No user exists...", HttpStatus.NO_CONTENT);
      }
      return users
    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);

    }
  }

  async findUserByEmailORUserName(emailOrUserName: string): Promise<User> {
    try {
      const users = await this.usersRepository.findOne({
        where: [
          { isActive: true, username: emailOrUserName },
          { isActive: true, email: emailOrUserName }
        ],
        select: {
          id: true,
          firstName: true,
          lastName: true,
          age: true,
          email: true,
          gender: true,
          username: true,
          role: true,
          password: true
        }

      });

      if (!users) {
        throw new HttpException("No user exists...", HttpStatus.NO_CONTENT);
      }
      return users
    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);

    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userTobeUpdated = await this.usersRepository.findOne({
        where: { isActive: true, id: id },
      });

      if (!userTobeUpdated) {
        throw new HttpException("No user exists...", HttpStatus.NO_CONTENT);
      }

      const { age, email, firstName, gender, lastName, password, username, role } = updateUserDto;

      let hashedPassword = "";
      if (password) {
        hashedPassword = await hashString(password, saltOrRound);
      }

      userTobeUpdated.age = age ? age : userTobeUpdated.age;
      userTobeUpdated.email = email ? email : userTobeUpdated.email;
      userTobeUpdated.firstName = firstName ? firstName : userTobeUpdated.firstName;
      userTobeUpdated.gender = gender ? gender : userTobeUpdated.gender;
      userTobeUpdated.lastName = lastName ? lastName : userTobeUpdated.lastName;
      userTobeUpdated.password = password ? hashedPassword : userTobeUpdated.password;
      userTobeUpdated.role = role ? role : userTobeUpdated.role;
      //userTobeUpdated.username = username?username:userTobeUpdated.username;

      return this.usersRepository.save(userTobeUpdated)
    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);

    }
  }

  //This is soft delete
  async removeUser(id: number) {
    try {
      const userTobeUpdated = await this.usersRepository.findOne({
        where: { isActive: true, id: id },
      });

      if (!userTobeUpdated) {
        throw new HttpException("No user exists...", HttpStatus.NO_CONTENT);
      }

      userTobeUpdated.isActive = false;

      const delUser = await this.usersRepository.save(userTobeUpdated);

      return delUser ? { status: HttpStatus.OK, message: "user deleted successfully" }
        : { status: HttpStatus.BAD_REQUEST, message: "Error while deleting user" }

    } catch (error) {
      throw new HttpException(error?.message || error?.response, error?.status || HttpStatus.BAD_REQUEST);
    }
  }
}
