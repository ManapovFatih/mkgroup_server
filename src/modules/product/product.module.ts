import { CategoryModule } from './../category/category.module';
import { FileModule } from './../file/file.module';
import { ProductService } from './product.service';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { DatabaseModule } from '../database/database.module';

@Module({
    providers: [ProductService],
    controllers: [ProductController],
    exports: [ProductService],
    imports: [DatabaseModule, FileModule, CategoryModule],
})
export class ProductModule {}
