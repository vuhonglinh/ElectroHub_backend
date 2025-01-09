import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { User } from 'src/users/entities/user.entity';
import { Post } from 'src/posts/entities/post.entity';
import { ConfigModule } from '@nestjs/config';
import { UploadsModule } from './uploads/uploads.module';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { Attribute, AttributeProduct, AttributeValue, Product, ProductAttributeValue, ProductImage } from 'src/products/entities/product.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      entities: [
        User, Post, Product, Category, Attribute, AttributeProduct, AttributeValue, AttributeValue, ProductAttributeValue, ProductImage,
      ],
      database: 'electro_hub',
      synchronize: true,
      // logging: ['query', 'error', 'schema', 'warn'], // Thêm logging để hiển thị các câu lệnh SQL và lỗi
    }),
    UsersModule,
    PostsModule,
    ConfigModule.forRoot({ isGlobal: true }),
    UploadsModule,
    ProductsModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
