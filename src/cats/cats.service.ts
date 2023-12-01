import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
@Injectable()

export class CatsService {
    private readonly cates: Cat[] = [];

    create(cat: Cat) {
        this.cates.push(cat);
    }

    findAll(): Cat[] {
        return this.cates;
    }
}
