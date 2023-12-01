// user.entity.ts
import {
    Entity,
    Column,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity';

@Entity() // sql表名为role
export class Role {
    // 主键装饰器，也会进行自增
    @PrimaryGeneratedColumn('uuid')
    id: number;

    // 列装饰 名称
    @Column()
    name: string;

    // 多对多
    @ManyToMany((type) => User, (user) => user.roles)
    users: User[];

    @CreateDateColumn()
    createAt: Date;

    @UpdateDateColumn()
    updateAt: Date;
}
