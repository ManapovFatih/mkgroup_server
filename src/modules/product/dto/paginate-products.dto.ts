import { Product } from '@prisma/client';
import { PaginationConfig } from './../../../base/paginationConfig';
import { IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginateProductsDto extends PaginationConfig<Product> {
    @ApiProperty({
		required: false,
        example: 10,
    })
    @IsOptional()
    @IsNumber()
    minPrice: number;

    @ApiProperty({
		required: false,
        example: 50,
    })
    @IsOptional()
    @IsNumber()
    maxPrice: number;
}
