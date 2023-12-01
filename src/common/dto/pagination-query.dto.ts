import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginationQueryDto {
    @ApiProperty({ description: "数量", default: 10 })
    // 标记为可选
    @IsOptional()
    // 检查，如果传入的是正数，则大于0
    // @IsPositive()
    // 确保传入的值被解析为数字
    // @Type(() => Number)
    limit: number;

    @ApiProperty({ description: '页码', default: 1 })
    @IsOptional()
    // @IsPositive()
    // @Type(() => Number)
    offset: number;

}