import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsNotEmpty } from 'class-validator';

// 自己设置类型
export class LoginUserDto {
    //ApiProperty是对数据类型的描述
    @ApiProperty({ description: '用户名', default: '刘备' })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({ description: '密码', default: '123456' })
    @IsNotEmpty()
    @IsString()
    password: string;
}