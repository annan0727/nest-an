import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../common/dto/login.dto';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from 'src/common/exceptions/business.error.codes';
import { LocalAuthGuard } from './guards/local-auth.guard';
@ApiTags("授权模块")
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  @UseGuards(LocalAuthGuard) // 启用本地身份验证
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({
    summary: "登录"
  })
  async login(@Body() loginBody: LoginUserDto) {
    console.log('2-请求登陆', loginBody);
    try {
      return await this.authService.login(loginBody)
    } catch (err) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '登录失败'
      });
    }
  }
}
