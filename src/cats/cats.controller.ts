import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { CreateCatDto, ListAllEntities, UpdateCatDto } from './dto/cat.dto'
import { Response } from 'express';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags("猫模块")
@Controller('cats')

// 正常写法
export class CatsController {
    constructor(private catsService: CatsService) { }

    @Post()
    @ApiOperation({
        summary: "新增猫"
    })
    async create(@Body() createCatDto: CreateCatDto) {
        this.catsService.create(createCatDto);
    }

    @Get()
    @ApiOperation({
        summary: "查询所有的猫"
    })
    async findAll(): Promise<Cat[]> {
        return this.catsService.findAll()
    }

    @Get(':id')
    @ApiOperation({
        summary: "查询一只猫"
    })
    findOne(@Param('id') id: string) {
        return `This action returns a #${id} cat`;
    }

    @Put(':id')
    @ApiOperation({
        summary: "更新猫"
    })
    update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
        return `This action updates a #${id} cat`;
    }

    @Delete(':id')
    @ApiOperation({
        summary: "删除一只猫"
    })
    remove(@Param('id') id: string) {
        return `This action removes a #${id} cat`;
    }
}

// 库特定方法
// @Controller('cats')
// export class CatsController {
//     @Post()
//     create(@Res() res: Response) {
//         res.status(HttpStatus.CREATED).send()
//     }
// }
