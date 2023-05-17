import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Быстровозводимый склад 12x12',
  })
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
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    example: ['Image from Form-Data 1', 'Image from Form-Data 2'],
    description: 'Images of product',
    required: false,
  })
  @IsOptional()
  images: Express.Multer.File[];

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  categoryId: number;
}
