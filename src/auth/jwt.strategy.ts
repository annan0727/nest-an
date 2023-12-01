import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';

import { AuthService } from "./auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // 为true则不验证token的到期时间
            secretOrKey: process.env.JWT_KEY
        })
    }

    // 验证回调
    // 对于 JWT 策略，Passport 首先验证 JWT 的签名并解码 JSON 。然后调用我们的 validate() 方法，该方法将解码后的 JSON 作为其单个参数传递。根据 JWT 签名的工作方式，我们可以保证接收到之前已签名并发给有效用户的有效 token 令牌。
    async validate(payload: any) {
        /**
        * payload是用户信息和登录时间以及过期时间
        */
        const existUser = await this.authService.findOneById(payload.id);
        console.log('4-验证回调');
        if (!existUser) {
            throw new UnauthorizedException('token不正确');
        }
        return existUser;
    }
}