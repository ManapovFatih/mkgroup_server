import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';

@Injectable()
export class TableService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createTableDto: CreateTableDto) {
        const { ...createDto } = createTableDto;
        return await this.prismaService.table.create({
            data: { ...createDto },
        });
    }

    async findByProductId(productId: number) {
        return await this.prismaService.table.findMany({
            where: {
                productId,
            },
        });
    }

    async findById(id: number) {
        return await this.prismaService.table.findMany({
            where: {
                id,
            },
        });
    }

    async findAll() {
        return await this.prismaService.table.findMany();
    }

    async delete(id: number) {
        await this.prismaService.table.delete({
            where: {
                id,
            },
        });
    }

    async update(id: number, updateTableDto: UpdateTableDto) {
        const table = await this.findById(id);
        const { ...createDto } = updateTableDto;
       return await this.prismaService.table.update({
            where: {
                id,
            },
            data: {
                ...createDto,
            },
        });
    }
}
