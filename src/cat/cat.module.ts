import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { DatabaseModule } from 'src/database/database.module';
import { catProviders } from './cat.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CatController],
  providers: [
    ...catProviders,
    CatService
  ]
})
export class CatModule {}
