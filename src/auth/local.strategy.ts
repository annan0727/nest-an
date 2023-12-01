// 实现 Passport 本地身份验证策略
// 本地策略主要是验证账号和密码是否存在，如果存在就登陆，返回token
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    // 登录时进行本地身份验证
    async validate(username: string, password: string): Promise<any> {
        const user = await this.authService.validateUser(username, password);
        console.log('1-登录前进行了本地身份验证');
        if (!user) {
            throw new UnauthorizedException("用户名或密码错误")
        }
        return user
    }
}