import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { BusinessException } from 'src/common/exceptions/business.exception';
import { BUSINESS_ERROR_CODE } from 'src/common/exceptions/business.error.codes';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { log } from 'console';

@Injectable()
export class UserService {
  // 构造函数，初始化数据
  constructor(
    // 装饰器 注入用户仓库
    @InjectRepository(User)
    // 定义私有属性 用户仓库
    private userRepository: Repository<User>,

    // 注入 角色仓库
    @InjectRepository(Role)
    // 私有属性 角色仓库
    private roleRepository: Repository<Role>
  ) { }

  // 创建用户
  async create(createUserDto: CreateUserDto) {

    try {
      const roles = await Promise.all(
        createUserDto.roles.map((name) => this.preloadRoleByName(name))
      )

      const user = this.userRepository.create({ ...createUserDto, roles })
      return this.userRepository.save(user);

    } catch (err) {
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: "用户添加失败"
      })
    }
  }

  async getUserList(paginationsQuery: PaginationQueryDto) {
    const { limit, offset } = paginationsQuery;
    console.log(limit, offset, '5-进行接口请求');
    return await this.userRepository.find({
      // 指定关系
      relations: ['roles'],
      skip: (offset - 1) * limit,
      take: limit
    });
  }

  async findOneById(id: string) {
    return await this.userRepository.findOne({
      where: { id },
      relations: ['roles']
    });
  }

  async findOneByrName(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      relations: ['roles']
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      // 重新去获取角色信息，角色可能会有改变
      const roles = updateUserDto.roles && (await Promise.all(
        updateUserDto.roles.map((name) => this.preloadRoleByName(name))
      ))

      //重新查询用户 并更新整合用户信息 以及角色信息 返回用户实体
      const user = await this.userRepository.preload({
        id: id,
        ...updateUserDto,
        roles
      })
      // 如果没有查到该用户
      if (!user) {
        throw new NotFoundException(`${id} not found`);
      }
      return this.userRepository.save(user)
    } catch (err) {
      // console.log(err);
      throw new BusinessException({
        code: BUSINESS_ERROR_CODE.COMMON,
        message: '用户修改失败'
      });
    }
    // return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`${id} not found`);
    }
    return await this.userRepository.remove(user)
  }

  // 私有方法，将角色名作为参数返回
  private async preloadRoleByName(name: string): Promise<Role> {
    const existingRole = await this.roleRepository.findOne({ where: { name } });
    if (existingRole) {
      return existingRole
    }
    return this.roleRepository.create({ name })
  }
}
