import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('createCategory')
  create(@Body() args: CreateCategoryDto) {
    return this.categoriesService.create(args);
  }

  @Get('getAllCategories')
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.categoriesService.findOneByUuid(uuid);
  }

  @Patch('update/:uuid')
  update(@Param('uuid') uuid: string, @Body() args: UpdateCategoryDto) {
    return this.categoriesService.update(uuid, args);
  }

  @Delete(':uuid')
  remove(@Param('uuid') uuid: string) {
    return this.categoriesService.remove(uuid);
  }
}
