import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TableEntity } from './entities/table.entity';
import { UpdateTableDto } from './dto/update-table.dto';
import { TableService } from './table.service';
import { CreateTableDto } from './dto/create-table.dto';

@ApiTags('Table')
@Controller('table')
export class TableController {
    constructor(private readonly tableService: TableService) {}

    @ApiOperation({ summary: 'Get table by productId' })
    @ApiOkResponse({
        type: TableEntity,
    })
    @Get(':productId')
    async getMany(@Param('productId', ParseIntPipe) productId: string) {
        return await this.tableService.findByProductId(+productId);
    }

    @ApiOperation({ summary: 'Get all tables' })
    @ApiOkResponse({
        type: TableEntity,
    })
    @Get()
    async getAll() {
        return await this.tableService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Create table' })
    @ApiCreatedResponse({
        type: TableEntity,
    })
    @ApiConsumes('multipart/form-data')
    @Post()
    async create(@Body() createTableDto: CreateTableDto) {
        return await this.tableService.create(createTableDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Update table' })
    @ApiOkResponse({
        type: TableEntity,
    })
    @ApiConsumes('multipart/form-data')
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateTableDto: UpdateTableDto,
    ) {
        return await this.tableService.update(id, updateTableDto);
    }

    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Delete table by id' })
    @ApiOkResponse({
        type: TableEntity,
    })
    @Delete(':id')
    async delete(@Param('id', ParseIntPipe) id: number) {
        return await this.tableService.delete(id);
    }
}
