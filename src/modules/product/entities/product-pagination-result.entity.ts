import { ProductEntity } from './product.entity';
import { PaginationResult } from '../../../base/paginationResult/paginationResult';
import { ApiProperty } from '@nestjs/swagger';

export class ProductPaginationResultEntity extends PaginationResult<ProductEntity> {
    @ApiProperty({
        example: 10,
    })
    minPrice: number;

    @ApiProperty({
        example: 50,
    })
    maxPrice: number;
}
