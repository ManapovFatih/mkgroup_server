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
    ) {}

    async create(createProductDto: CreateProductDto, images: Express.Multer.File[]) {
        const { ...createDto } = createProductDto;
        const filenames = await Promise.all(images.map(image => this.imageService.updateImage(image, 'products')));
        return await this.prismaService.product.create({
            data: {
                ...createDto,
                images: filenames,
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

    async findById(id: number) {
        return await this.prismaService.product.findUniqueOrThrow({
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

        if (paginateProductsDto.categoryId) {
            whereObject['categoryId'] = paginateProductsDto.categoryId;
        }

        const count = await this.prismaService.product.count({
            where: whereObject,
        });
        const currentPage = paginateProductsDto.page;
        const totalPages = Math.ceil(count / paginateProductsDto.limit);
        const nextPage = currentPage < totalPages ? currentPage + 1 : null;
        const prevPage = currentPage > 1 ? currentPage - 1 : null;
        const lastPage = totalPages;
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
                prevPage,
                currentPage,
                nextPage,
                lastPage,
                categoryId: paginateProductsDto.categoryId,
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

    async update(id: number, updateProductDto: UpdateProductDto, images: Express.Multer.File[]) {
        const product = await this.findById(id);
        const { setImageToNull, ...createDto } = updateProductDto;
        const filenames = await Promise.all(images.map(async (image, index) => {
            const filename = await this.imageService.updateImage(image, 'products', product.images[index], setImageToNull);
            return filename;
          }));
        return await this.prismaService.product.update({
            where: {
                id,
            },
            data: {
                ...createDto,
                images: filenames,
            },
        });
    }
}
