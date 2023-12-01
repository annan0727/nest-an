import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, ClassSerializerInterceptor, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from 'src/common/exceptions/business.error.codes';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';

@ApiTags("用户模块")
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('create')
  @ApiOperation({
    summary: "新增用户"
  })
  // 请求返回的数据密码字段过滤掉
  @UseInterceptors(ClassSerializerInterceptor)
  // @Body是指获取到（http请求）客户端传递过来的body体中的数据，将数据给createUserDto这个变量，CreateUserDto是TS类型约束
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.userService.create(createUserDto);
    } catch (err) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "用户添加失败"
      })
    }
  }

  @Get('list')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: "查询所有用户"
  })
  findAll(@Query() paginationsQuery: PaginationQueryDto) {
    // console.log(paginationsQuery, '5-进行接口请求');
    try {
      return this.userService.getUserList(paginationsQuery);
    } catch (err) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "获取用户失败"
      })
    }
  }

  @Get('list/:id')
  @ApiOperation({
    summary: "根据id查询某个用户"
  })
  findOne(@Param('id') id: string) {
    try {
      return this.userService.findOneById(id);
    } catch (err) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "获取用户失败"
      })
    }
  }

  @Patch('list/:id')
  @ApiOperation({
    summary: "根据id修改用户信息"
  })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {

    try {
      return this.userService.update(id, updateUserDto);
    } catch (err) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "修改用户失败"
      })
    }
  }

  @Delete('list/:id')
  @ApiOperation({
    summary: "删除用户"
  })
  remove(@Param('id') id: string) {
    try {
      return this.userService.remove(id);
    } catch (err) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "删除用户失败"
      })
    }
  }
}
