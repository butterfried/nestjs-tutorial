import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { DatabaseModule } from 'src/database/database.module';
import { ownerProviders } from './owner.providers';
import { catProviders } from 'src/cat/cat.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OwnerController],
  providers: [
    ...ownerProviders,
    ...catProviders,
    OwnerService
  ]
})
export class OwnerModule {}
