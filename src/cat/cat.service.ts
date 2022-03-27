import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';
import { CatNotFoundException } from './exception/cat-not-found.exception';

@Injectable()
export class CatService {
  constructor(
    @Inject('CAT_REPOSITORY')
    private catRepository: Repository<Cat>,
  ) {}

  create(createCatDto: CreateCatDto) {
    const cat = new Cat
    cat.name = createCatDto.name
    cat.age = createCatDto.age
    cat.description = createCatDto.description
    return this.catRepository.save(cat)
  }

  async findAll(): Promise<Cat[]> {
    return this.catRepository.find()
  }

  async findOne(id: number): Promise<Cat> {
    const cat = await this.catRepository.findOne(id)
    if (cat == null) {
      throw new CatNotFoundException()
    }
    return cat
  }

  async update(id: number, updateCatDto: UpdateCatDto): Promise<Cat> {
    const cat = await this.catRepository.findOne(id)
    if (cat == null) {
      throw new CatNotFoundException()
    }
    cat.name = updateCatDto.name
    cat.age = updateCatDto.age
    cat.description = updateCatDto.description
    return this.catRepository.save(cat)
  }

  async remove(id: number) {
    const cat = await this.catRepository.findOne(id)
    if (cat == null) {
      throw new CatNotFoundException()
    }
    return this.catRepository.remove(cat)
  }
}
