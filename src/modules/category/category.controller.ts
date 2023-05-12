import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryEntity } from './entities/cateogory.entity';
import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCategoryDto } from './dto/update-category.dto';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    @ApiOperation({ summary: 'Get one by id' })
    @ApiOkResponse({
        type: CategoryEntity,
    })
    @Get(':id')
    async getOne(@Param('id', ParseIntPipe) id: string) {
        return await this.categoryService.findById(+id);
    }

    @ApiOperation({ summary: 'Get all categories' })
    @ApiOkResponse({
        type: [CategoryEntity],
    })
    @Get()
    async getAll() {
        return await this.categoryService.findAll();
    }

    @ApiOperation({ summary: 'Create category' })
    @ApiCreatedResponse({
        type: CategoryEntity,
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    @Post()
    async create(@UploadedFile() image: Express.Multer.File, @Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoryService.create(createCategoryDto, image);
    }

    @ApiOperation({ summary: 'Update category' })
    @ApiOkResponse({
        type: CategoryEntity,
    })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('image'))
    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() image: Express.Multer.File,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return await this.categoryService.update(id, updateCategoryDto, image);
    }
}
