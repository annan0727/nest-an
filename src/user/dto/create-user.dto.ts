import { ApiProperty } from "@nestjs/swagger";

import { IsString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    // ApiProperty 是对数据类型的描述
    @ApiProperty({ description: '用户名', default: '张三' })
    @IsNotEmpty({ message: '用户名不能为空' })
    @IsString()
    username: string

    @ApiProperty({ description: '密码', default: '' })
    @IsNotEmpty({ message: '密码不能为空' })
    @IsString()
    password: string

    @ApiProperty({ description: '角色', default: ['admin'] })
    @IsNotEmpty()
    // @IsString({ each: true })
    roles: string[]
}
