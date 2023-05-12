import { CategoryService } from './../category/category.service';
import { GetProductsByIdsDto } from './dto/products-get-by-ids.dto';
import { PaginateProductsDto } from './dto/paginate-products.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { ImageService } from '../file/image.service';
import { UpdateProductDto } from './dto/update-product.dto';
import { FindProductDto } from './dto/find-product.dto';

@Injectable()
export class ProductService {
	//Произошла инкостыляция
    constructor(
        private readonly prismaService: PrismaService,
        private readonly imageService: ImageService,
        private readonly categoryService: CategoryService,
    ) {}

    async create(createProductDto: CreateProductDto, image: Express.Multer.File) {
        const { setImageToNull, ...createDto } = createProductDto;
        const filename = await this.imageService.updateImage(image, 'products');
        return await this.prismaService.product.create({
            data: {
                ...createDto,
                image: filename,
            },
        });
    }

    async search(findProductDto: FindProductDto) {
        return await this.prismaService.product.findMany({
            where: {
                name: {
                    search: findProductDto.query,
                },
            },
        });
    }

    async getByIds(getProductsByIdsDto: GetProductsByIdsDto) {
        const ids: number[] = JSON.parse(getProductsByIdsDto.ids);
        return await this.prismaService.product.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
    }

    async findById(id: number) {
        return await this.prismaService.product.findUniqueOrThrow({
            where: {
                id,
            },
        });
    }

    async findByIdWithParamPreloads(id: number) {
        const product = await this.prismaService.product.findUniqueOrThrow({
            where: {
                id,
            },
        });
    }

    async findAll() {
        return await this.prismaService.product.findMany();
    }

    async paginate(paginateProductsDto: PaginateProductsDto) {
        const key = paginateProductsDto.orderBy;
        const direction = paginateProductsDto.direction;
        // need a typings here
        const orderObject = {};
        const whereObject = {};
        const meta = await this.prismaService.product.aggregate({
            _min: {
                price: true,
            },
            _max: {
                price: true,
            },
            where: whereObject,
        });

        if (paginateProductsDto.minPrice || paginateProductsDto.maxPrice) {
            whereObject['price'] = {
                gte: paginateProductsDto.minPrice || 0,
                lte: paginateProductsDto.maxPrice || 50000,
            };
        }

        const count = await this.prismaService.product.count({
            where: whereObject,
        });

        orderObject[key] = direction;

        const body = await this.prismaService.product.findMany({
            skip: (paginateProductsDto.page - 1) * paginateProductsDto.limit,
            take: paginateProductsDto.limit,
            orderBy: orderObject,
            where: whereObject,
        });
        //add
        return {
            meta: {
                total: count,
                minPrice: meta._min.price,
                maxPrice: meta._max.price,
            },
            body,
        };
    }

    async delete(id: number) {
        await this.prismaService.product.delete({
            where: {
                id,
            },
        });
    }

    async update(id: number, updateProductDto: UpdateProductDto, image: Express.Multer.File) {
        const product = await this.findById(id);
        const { setImageToNull, ...createDto } = updateProductDto;
        const filename = await this.imageService.updateImage(image, 'products', product.image, setImageToNull);
        return await this.prismaService.product.update({
            where: {
                id,
            },
            data: {
                ...createDto,
                image: filename,
            },
        });
    }
}
