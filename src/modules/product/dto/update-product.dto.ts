import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty({
        example: 'Быстровозводимый склад 12x12',
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        example: '12x12 м',
    })
    @IsOptional()
    @IsString()
    size: string;

    @ApiProperty({
        example: 'Предзаказ',
    })
    @IsOptional()
    @IsString()
    availability: string;

    @ApiProperty({
        example: 890,
    })
    @IsOptional()
    @IsNumber()
    price: number;

	@ApiProperty({
        example: 'Хороший гараж для техники',
		required: false,
    })
	@IsOptional()
    @IsString()
    description: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        example: 'Image from Form-Data',
        description: 'Image of product',
        required: false,
    })
    @IsOptional()
    image: Express.Multer.File;

    @ApiProperty({
        example: false,
        description: 'If true, setting image to null, else default behaviour',
		required: false,
    })
    @IsOptional()
    @IsBoolean()
    setImageToNull: boolean;

    @ApiProperty({
        example: 1,
    })
    @IsOptional()
    @IsString()
    categoryId:  number;
}
