import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { md5password } from '@/utils/password-handle';
import { BusinessException } from '@/common/exceptions/business.exception';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) { }

  // 验证用户是否存在
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOneByrName(username);
    if (user && user.password === md5password(password)) {
      return user
    }
    throw new BusinessException('用户名或密码错误')
  }

  // 登录 处理jwt
  async login(user: any) {
    console.log('3-本地验证成功-处理jwt签证');
    const result = await this.validateUser(user.username, user.password);

    const payload = {
      id: result.id,
      username: result.username,
      roles: result.roles
    }

    // 登陆成功颁发签证
    return {
      message: "登录成功！",
      username: user.username,
      token: this.jwtService.sign(payload)
    }
  }

  // 校验token
  async verifyToken(token: string) {
    if (token) {
      const jwt = token.replace('Bearer', '');
      console.log("jwt---", jwt);

      const id = await this.jwtService.verify(jwt);
      return id;
    }
    throw new BusinessException('token不存在！');
  }

  async findOneById(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      relations: { roles: true }
    });
  }

}
