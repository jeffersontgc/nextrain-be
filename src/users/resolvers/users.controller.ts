import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('createUser')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('getAllUsers')
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':uuid')
  findByUuid(@Param('uuid') uuid: string) {
    return this.usersService.findByUuid(uuid);
  }

  @Patch('/updateUser/:uuid')
  update(@Param('uuid') uuid: string, @Body() args: UpdateUserDto) {
    return this.usersService.update(uuid, args);
  }

  @Delete(':uuid')
  delete(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}
