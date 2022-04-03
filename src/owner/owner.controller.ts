import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { AddCatDto } from './dto/add-cat.dto';

@Controller('owners')
export class OwnerController {
  constructor(private readonly ownerService: OwnerService) {}

  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto);
  }

  @Get()
  findAll() {
    return this.ownerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(+id, updateOwnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ownerService.remove(+id);
  }

  @Post(':id/cats')
  addCat(@Param('id') id: string, @Body() addCatDto: AddCatDto) {
    return this.ownerService.addCat(+id, addCatDto)
  }

  @Get(':id/cats')
  getCatList(@Param('id') id: string) {
    return this.ownerService.getCatList(+id)
  }

  @Delete(':id/cats/:catId') 
  removeCat(
    @Param('id') id: string,
    @Param('catId') catId: string,
  ) {
    return this.ownerService.removeCat(+id, +catId)
  }
}
