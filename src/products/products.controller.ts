import { Controller, Get, Post, Body, Patch, Param, Delete, Res, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from 'src/products/dto/create-product.dto';
import { Response } from 'express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';


@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }


  @Get()
  async index(@Res() response: Response) {
    try {
      const data = await this.productsService.getAll()
      return response.status(200).json({
        message: 'Lấy danh sách sản phẩm',
        data: data
      })
    } catch (error) {
      return response.status(400).json({
        message: error.message
      })
    }
  }


  @Post('create')
  async create(
    @Body() body: ProductDto,
    @Res() response: Response,) {
    try {
      const data = await this.productsService.createProduct(body);
      return response.status(201).json({
        message: 'Thêm sản phẩm thành công',
        data: data
      });
    } catch (err) {
      return response.status(400).json({
        message: err.message,
      })
    }
  }




}
