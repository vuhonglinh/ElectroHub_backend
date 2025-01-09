import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Attribute,
  AttributeProduct,
  AttributeValue,
  Product,
  ProductAttributeValue,
  ProductImage,
  ProductResource,
  ProductVariantResource,
} from 'src/products/entities/product.entity';
import { IsNull, Repository } from 'typeorm';
import { ProductDto } from 'src/products/dto/create-product.dto';
import { UploadsService } from 'src/uploads/uploads.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductImage) private productImageRepository: Repository<ProductImage>,
    @InjectRepository(AttributeValue) private attributeValueRepository: Repository<AttributeValue>,
    @InjectRepository(AttributeProduct) private attributeProductRepository: Repository<AttributeProduct>,
    @InjectRepository(Attribute) private attributeRepository: Repository<Attribute>,
    @InjectRepository(ProductAttributeValue) private productAttributeValueRepository: Repository<ProductAttributeValue>,
    private uploadsService: UploadsService,
  ) { }

  async getAll() {
    try {
      const data = await this.productRepository.find({
        where: { parent_id: IsNull() },
        relations: ['productVariants'],
        select: {
          ...ProductResource,
          productVariants: ProductVariantResource
        }
      });
      return data;
    } catch (error) {
      throw error;
    }
  }

  async createProduct(data: ProductDto): Promise<Product> {
    try {
      const dataCore = {
        name: data.name,
        sku: 'LATBOT' + Date.now(),
        description: data.description,
        simple: data.is_simple,
        category_id: data.category_id,
        status: data.status,
      };
      const dataSimple = data.is_simple
        ? {
          sub_description: data.sub_description,
          price: data.price,
          quantity: data.quantity,
          length: data.length,
          width: data.width,
          height: data.height,
          weight: data.weight,
        }
        : {};

      const productData = { ...dataCore, ...dataSimple };
      const product = this.productRepository.create(productData);
      await this.productRepository.save(product);

      // Handle attributes
      if (data.attributes) {
        for (const item of data.attributes) {
          let attribute = await this.attributeRepository.findOne({ where: { name: item.name } });
          if (!attribute) {
            attribute = this.attributeRepository.create({ name: item.name });
          }
          await this.attributeRepository.save(attribute);

          const attributeProduct = this.attributeProductRepository.create({
            product_id: product.id,
            attribute_id: attribute.id,
          });
          await this.attributeProductRepository.save(attributeProduct);
          const existingValues = await this.attributeValueRepository.find({
            where: { attribute_id: attribute.id },
          });
          const newValues = item.values.filter((value) => !existingValues.some((ev) => ev.value == value.value));
          console.log(newValues, item.values)
          for (const value of newValues) {
            const attributeValue = this.attributeValueRepository.create({
              attribute_id: attribute.id,
              value: value.value,
            });
            await this.attributeValueRepository.save(attributeValue);
          }

          for (const { value } of item.values) {
            const attributeValue = await this.attributeValueRepository.findOne({ where: { value } });
            const productAttributeValue = this.productAttributeValueRepository.create({
              product_id: product.id,
              attribute_value_id: attributeValue.id,
            });
            await this.productAttributeValueRepository.save(productAttributeValue);
          }
        }
      }

      // Handle variants
      if (data.variants) {
        for (const [key, variantData] of data.variants.entries()) {
          const variant = this.productRepository.create({
            name: product.name,
            sku: product.sku + '-V' + (key + 1),
            sub_description: variantData.sub_description,
            simple: data.is_simple,
            category_id: data.category_id,
            status: data.status,
            price: variantData.price,
            quantity: variantData.quantity,
            length: variantData.length,
            width: variantData.width,
            height: variantData.height,
            weight: variantData.weight,
            parent_id: product.id,
          });

          await this.productRepository.save(variant);

          if (variantData.attributes) {
            for (const variantAttr of variantData.attributes) {
              const attributeValue = await this.attributeValueRepository.findOne({ where: { value: variantAttr.value } });
              const productAttributeValue = this.productAttributeValueRepository.create({
                attribute_value_id: attributeValue.id,
                product_id: variant.id,
              });
              await this.productAttributeValueRepository.save(productAttributeValue);
            }
          }
        }
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
}

















