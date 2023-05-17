import { IsNumber, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTableDto {
  @ApiProperty({
    example: 'At vero eos et accusamus',
  })
  @IsString()
  text: string;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    example: 1,
  })
  @IsNumber()
  productId: number;
}
