import { ProductPaginationResultEntity } from './entities/product-pagination-result.entity';
import { PaginateProductsDto } from './dto/paginate-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductEntity } from './entities/product.entity';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindProductDto } from './dto/find-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}


	

    @ApiOperation({ summary: 'Paginate products' })
    @ApiOkResponse({
        type: ProductPaginationResultEntity,
    })
    @Get()
    async paginate(@Query() paginateProductsDto: PaginateProductsDto) {
        return await this.productService.paginate(paginateProductsDto);
    }


	@ApiOperation({ summary: 'Get product' })
    @ApiOkResponse({
        type: ProductEntity,
    })
    @Get(':id')
    async get(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.findById(id);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create product' })
    @ApiOkResponse({
        type: ProductEntity,
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    @Post()
    async create(@UploadedFile() image: Express.Multer.File, @Body() createProductDto: CreateProductDto) {
        return await this.productService.create(createProductDto, image);
    }

    @ApiOperation({ summary: 'Find product' })
    @ApiOkResponse({
        type: [ProductEntity],
    })
    @Get('search')
    async find(@Query() findProductDto: FindProductDto) {
        return await this.productService.search(findProductDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update product' })
    @ApiOkResponse({
        type: ProductEntity,
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() image: Express.Multer.File,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return await this.productService.update(id, updateProductDto, image);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete product by id' })
    @ApiOkResponse({
        type: ProductEntity,
    })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.productService.delete(id);
    }
}
