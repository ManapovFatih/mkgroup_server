import { ApiProperty } from '@nestjs/swagger';
import { Table } from '@prisma/client';

export class TableEntity implements Table {
  @ApiProperty({
    example: 1,
  })
  id: number;

  @ApiProperty({
    example: 'At vero eos et accusamus',
  })
  text: string;

  @ApiProperty({
    example: 1,
  })
  price: number;

  @ApiProperty({
    example: 1,
  })
  productId: number;
}
