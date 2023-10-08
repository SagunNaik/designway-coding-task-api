import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { routeConstant } from 'src/utilities/constant';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/utilities/roles.enum';

const { USERS } = routeConstant;

@ApiTags(USERS)
@Controller(USERS)
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RoleGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ status: HttpStatus.CREATED, description: "New User Created", type: String })
  @Roles(Role.ADMIN)
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  @Roles(Role.ADMIN)
  @ApiResponse({ status: HttpStatus.OK, description: "All User", type: String })
  findAll() {
    return this.usersService.findAllUser();
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiResponse({ status: HttpStatus.OK, description: "User", type: String })
  findOne(@Param('id') id: string) {
    return this.usersService.findOneUser(+id);
  }

  @Patch(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({ status: HttpStatus.OK, description: "User Updated", type: String })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.ADMIN, Role.USER)
  @ApiResponse({ status: HttpStatus.OK })
  remove(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }
}
