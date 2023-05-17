import {
  IsNumber,
  IsOptional,
  IsString,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTableDto {
  @ApiProperty({
    example: 'At vero eos et accusamus',
  })
  @IsOptional()
  @IsString()
  text: string;

  @ApiProperty({
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  productId: number;
}
