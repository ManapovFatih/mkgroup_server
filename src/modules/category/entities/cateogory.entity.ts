import { ApiProperty } from '@nestjs/swagger';
import { Category } from '@prisma/client';

export class CategoryEntity implements Category {
    @ApiProperty({
        example: 1,
    })
    id: number;

    @ApiProperty({
        example: 'Ангары',
    })
    name: string;

    @ApiProperty({
        example: 'products/asd9f91asf-img1.png',
    })
    image: string;
}
