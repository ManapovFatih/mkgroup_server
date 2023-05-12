import { IsArray, IsBoolean, IsNumber, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
    @ApiProperty({
        example: 'HIGHTEC GTS SPEZIAL SAE 20W-50',
		required: false,
    })
    @IsOptional()
    @IsString()
    name: string;

    @ApiProperty({
        type: 'string',
        format: 'binary',
        example: 'Image from Form-Data',
        description: 'Image of an event',
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
        example: 'Good oil',
		required: false,
    })
	@IsOptional()
    @IsString()
    description: string;

	@ApiProperty({
        example: 12344321,
		required: false,
    })
	@IsOptional()
    @IsNumber()
    article: number;

    @ApiProperty({
        example: 890,
		required: false,
    })
    @IsOptional()
    @IsNumber()
    price: number;

	@ApiProperty({
        example: 1234,
		required: false,
    })
    @IsOptional()
    @IsNumber()
    priceWithoutDiscount: number;

    @ApiProperty({
        example: [1, 2],
		required: false,
    })
    @IsOptional()
    @IsArray()
    specificationIds: string[];

    @ApiProperty({
        example: [1, 2, 4, 5],
		required: false,
    })
    @IsOptional()
    @IsArray()
    optionIds: string[];
}
