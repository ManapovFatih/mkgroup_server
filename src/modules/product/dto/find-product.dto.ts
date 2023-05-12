import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindProductDto {
    @ApiProperty({
        example: 'oil',
    })
    @IsString()
    query: string;
}
