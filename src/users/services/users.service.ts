import { Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async create(args: CreateUserDto) {
    const password = await bcrypt.hash(args.password, 10);

    const userToCreated = this.userRepo.create({
      ...args,
      uuid: uuidv4(),
      password,
    });

    await this.userRepo.save(userToCreated);

    return {
      status: 'ok',
    };
  }

  async findByEmail(email: string) {
    return this.userRepo.findOneOrFail({ where: { email } });
  }
  findAll() {
    return this.userRepo.find();
  }

  findByUuid(uuid: string) {
    const user = this.userRepo.findOneOrFail({ where: { uuid } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async update(uuid: string, args: UpdateUserDto) {
    try {
      const user = this.findByUuid(uuid);

      if (!user) {
        throw new NotFoundException('User not found');
      }

      await this.userRepo.update({ uuid }, args);

      return {
        status: 'ok',
      };
    } catch (error) {
      throw error;
    }
  }

  remove(uuid: string) {
    return `This action removes a #${uuid} user`;
  }
}
