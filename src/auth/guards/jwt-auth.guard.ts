import {
    Injectable,
    ExecutionContext,
    ForbiddenException,
    UnauthorizedException,
} from '@nestjs/common';

import { AuthService } from '@/auth/auth.service';
import { Observable } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    //     constructor(private readonly authService: AuthService) {
    //         super()
    //     }

    //     canActivate(
    //         context: ExecutionContext
    //     ): boolean | Promise<boolean> | Observable<boolean> {
    //         const req = context.switchToHttp().getRequest();
    //         const accessToken = req.header('Authorization');
    //         // console.log("req-accessToken", accessToken);

    //         if (accessToken) {
    //             try {
    //                 const decoded = this.authService.verifyToken(accessToken);
    //                 console.log(decoded, 'decoded');
    //                 req.user = decoded;
    //                 return true;
    //             } catch (err) {
    //                 console.log(err, 'err');
    //                 if (err.name === 'TokenExpiredError') {
    //                     throw new UnauthorizedException('Token has expired');
    //                 }
    //                 throw new UnauthorizedException('Invalid token');
    //             }
    //         } else {
    //             console.log("---未登录");
    //             throw new ForbiddenException('请先登录');
    //         }
    //     }

    //     /**
    //   * 这个方法会在授权成功后被调用，并将用户信息作为参数传入。
    //   * 如果授权失败，则会UnauthorizedException 异常
    //   */
    //     handleRequest<User>(err, user: User): User {
    //         console.log(err, user, 'handleRequest');
    //         if (err || !user) {
    //             throw new UnauthorizedException('身份验证失败');
    //         }
    //         return user;
    //     }

}
