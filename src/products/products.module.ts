import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Attribute, AttributeProduct, AttributeValue, Product, ProductAttributeValue, ProductImage } from 'src/products/entities/product.entity';
import { UploadsService } from 'src/uploads/uploads.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category, Product, AttributeProduct, Attribute, AttributeValue, ProductAttributeValue, ProductImage])],
  controllers: [ProductsController],
  providers: [ProductsService, UploadsService],
})
export class ProductsModule { }
