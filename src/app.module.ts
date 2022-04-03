import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { OwnerModule } from './owner/owner.module';

@Module({
  imports: [CatModule, OwnerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
