// user.entity.ts
import {
    Entity,
    Column,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    BeforeInsert,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Role } from './role.entity';
import { md5password } from '@/utils/password-handle';
@Entity() // sql表名为user
export class User {
    // 主键装饰器，也会进行自增
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // 列装饰 名称
    @Column()
    username: string;

    // 密码
    @Exclude()
    @Column({
        type: "varchar",
        length: 50,
        nullable: false
    })
    password: string;

    // 定义与其他表的关系
    // name 用于指定创中间表的表名
    @JoinTable({ name: 'user_roles' })
    // 指定多对多关系
    /**
     * 关系类型，返回相关实体引用
     * cascade: true，插入和更新启用级联，也可设置为仅插入或仅更新
     * ['insert']
     */
    // 多对多
    @ManyToMany((type) => Role, (role) => role.users, { cascade: true })
    roles: Role[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;

    @BeforeInsert()
    encryptPwd() {
        this.password = md5password(this.password)
    }

}
