import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ArgsFechtProducts, CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('createProduct')
  create(@Body() args: CreateProductDto) {
    return this.productsService.create(args);
  }

  @Get('getAllProducts')
  findAll(@Body('args') args: ArgsFechtProducts) {
    return this.productsService.findAll(args);
  }

  @Get(':uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.productsService.findOneByUuid(uuid);
  }

  @Patch('update/:uuid')
  update(@Param('uuid') uuid: string, @Body() args: UpdateProductDto) {
    return this.productsService.update(uuid, args);
  }

  @Delete('delete/:uuid')
  remove(@Param('uuid') uuid: string) {
    return this.productsService.remove(uuid);
  }
}
