import { ApiProperty } from '@nestjs/swagger';
import { Product } from '@prisma/client';

export class ProductEntity implements Product {
    @ApiProperty({
        example: 1,
    })
    id: number;

    @ApiProperty({
        example: 'Быстровозводимый склад 12x12',
    })
    name: string;

    @ApiProperty({
        example: '12x12 м',
    })
    size: string;

    @ApiProperty({
        example: 'Предзаказ',
    })
    availability: string;

    @ApiProperty({
        example: 890,
    })
    price: number;

    @ApiProperty({
        example: 'Хороший гараж для техники',
    })
    description: string;

    @ApiProperty({
        example: 'products/asd9f91asf-img1.png',
    })
    images: string[];

    @ApiProperty({
        example: 1,
    })
    categoryId: number;
}
