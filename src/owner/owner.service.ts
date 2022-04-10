import { Inject, Injectable } from '@nestjs/common';
import { Cat } from 'src/cat/entities/cat.entity';
import { CatNotFoundException } from 'src/cat/exception/cat-not-found.exception';
import { Repository } from 'typeorm';
import { AddCatDto } from './dto/add-cat.dto';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Address } from './entities/address.entity';
import { Owner } from './entities/owner.entity';
import { CatAlreadyHasOwnerException } from './exception/cat-already-has-owner.exception';
import { CatAlreadyOwnByThisOwnerException } from './exception/cat-already-own-by-this-owner.exception';
import { CatNotOwnByThisOwnerException } from './exception/cat-not-own-by-this-owner.exception';
import { OwnerNotFoundException } from './exception/owner-not-found.exception';

@Injectable()
export class OwnerService {
  constructor(
    @Inject('OWNER_REPOSITORY')
    private ownerRepository: Repository<Owner>,
    @Inject('CAT_REPOSITORY')
    private catRepository: Repository<Cat>,
    @Inject('ADDRESS_REPOSITORY')
    private addressRepository: Repository<Address>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto): Promise<Owner> {
    const owner = new Owner
    owner.name = createOwnerDto.name
    owner.phone = createOwnerDto.phone

    if (createOwnerDto.address != null) {
      let address = new Address
      let addressDto = createOwnerDto.address
      address.address = addressDto.address
      address.subDistrict = addressDto.subDistrict
      address.district = addressDto.district
      address.province = addressDto.province

      owner.address = address

      await this.addressRepository.save(address)
    }

    return await this.ownerRepository.save(owner)
  }

  async findAll(): Promise<Owner[]> {
    return await this.ownerRepository.find()
  }

  async findOne(id: number): Promise<Owner> {
    const owner = await this.ownerRepository.findOne(id)
    if (owner == null) {
      throw new OwnerNotFoundException()
    }
    return owner
  }

  async update(id: number, updateOwnerDto: UpdateOwnerDto): Promise<Owner> {
    const owner = await this.ownerRepository.findOne(id)
    if (owner == null) {
      throw new OwnerNotFoundException()
    }
    owner.name = updateOwnerDto.name
    owner.phone = updateOwnerDto.phone
    if (updateOwnerDto.address != null) {
      if (owner.address == null) {
        owner.address = new Address
      }
      owner.address.address = updateOwnerDto.address.address
      owner.address.subDistrict = updateOwnerDto.address.subDistrict
      owner.address.district = updateOwnerDto.address.district
      owner.address.province = updateOwnerDto.address.province

      await this.addressRepository.save(owner.address)
    }

    return await this.ownerRepository.save(owner)
  }

  async remove(id: number): Promise<Owner> {
    const owner = await this.ownerRepository.findOne(id)
    if (owner == null) {
      throw new OwnerNotFoundException()
    }
    return await this.ownerRepository.remove(owner)
  }

  async addCat(ownerId: number, addCatDto: AddCatDto): Promise<Cat[]> {
    const owner = await this.ownerRepository.findOne(ownerId)
    if (owner == null) {
      throw new OwnerNotFoundException()
    }
    
    const cat = await this.catRepository.findOne(addCatDto.catId)
    if (cat == null) {
      throw new CatNotFoundException()
    }

    if (cat.ownerId != null && cat.ownerId != owner.id) {
      throw new CatAlreadyHasOwnerException()
    }

    if (cat.ownerId == owner.id) {
      throw new CatAlreadyOwnByThisOwnerException()
    }

    // cat.ownerId = owner.id // ownerId
    cat.owner = owner

    await this.catRepository.save(cat)

    return await this.getCatList(owner.id)
  }

  async getCatList(ownerId: number): Promise<Cat[]> {
    const owner = await this.ownerRepository.findOne(ownerId)
    if (owner == null) {
      throw new OwnerNotFoundException()
    }
    return owner.cats
    // return await this.catRepository.find({"ownerId": ownerId})
  }

  async removeCat(ownerId: number, catId: number): Promise<Cat[]> {
    const owner = await this.ownerRepository.findOne(ownerId)
    if (owner == null) {
      throw new OwnerNotFoundException()
    }
    
    const cat = await this.catRepository.findOne(catId)
    if (cat == null) {
      throw new CatNotFoundException()
    }

    if (cat.ownerId != owner.id) {
      throw new CatNotOwnByThisOwnerException()
    }

    cat.ownerId = null
    await this.catRepository.save(cat)

    return await this.getCatList(owner.id)
  }
}
