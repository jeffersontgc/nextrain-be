import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';

import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private userRepo: Repository<Category>,
  ) {}
  async create(args: CreateCategoryDto) {
    const category = this.userRepo.create({
      ...args,
      uuid: uuidv4(),
    });

    await this.userRepo.save(category);

    return {
      status: 'ok',
    };
  }

  findAll() {
    return this.userRepo.find();
  }

  findOneByUuid(uuid: string) {
    const category = this.userRepo.findOneOrFail({ where: { uuid } });

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  update(uuid: string, args: UpdateCategoryDto) {
    const category = this.findOneByUuid(uuid);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    this.userRepo.update({ uuid }, args);

    return {
      status: 'ok',
    };
  }

  remove(uuid: string) {
    const category = this.findOneByUuid(uuid);

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    this.userRepo.delete({ uuid });

    return {
      status: 'ok',
    };
  }
}
