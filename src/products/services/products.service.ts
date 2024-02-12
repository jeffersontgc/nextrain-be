import { Injectable, NotFoundException } from '@nestjs/common';
import { ArgsFechtProducts, CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CategoriesService } from 'src/categories/services/categories.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    private categoryService: CategoriesService,
  ) {}

  async create(args: CreateProductDto) {
    try {
      const { category_uuid } = args;
      const category = await this.categoryService.findOneByUuid(category_uuid);

      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const productCreated = this.productRepo.create({
        ...args,
        uuid: uuidv4(),
        category,
        image:
          'https://c4.wallpaperflare.com/wallpaper/237/148/1014/burger-4k-top-rated-wallpaper-preview.jpg',
      });

      await this.productRepo.save(productCreated);

      return {
        status: 'ok',
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(args: ArgsFechtProducts): Promise<Product[]> {
    const { search, category_uuid } = args || {};
    let query = this.productRepo.createQueryBuilder('product');

    if (search) {
      query = query.where('product.name LIKE :search', {
        search: `%${search}%`,
      });
    }

    if (category_uuid) {
      query = query.innerJoinAndSelect(
        'product.category',
        'category',
        'category.uuid = :categoryUuid',
        { category_uuid },
      );
    }

    return await query.getMany();
  }

  async findOneByUuid(uuid: string) {
    const product = await this.productRepo.findOneOrFail({
      where: { uuid },
      relations: ['category'],
    });

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  async update(uuid: string, args: UpdateProductDto) {
    try {
      const product = this.findOneByUuid(uuid);

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      await this.productRepo.update({ uuid }, args);

      return {
        status: 'ok',
      };
    } catch (error) {
      throw error;
    }
  }

  remove(uuid: string) {
    const product = this.findOneByUuid(uuid);

    if (!product) {
      throw new NotFoundException('Product not found');
    }

    this.productRepo.delete({ uuid });

    return {
      status: 'ok',
    };
  }
}
