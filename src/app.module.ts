import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { drugModule } from './modules/drugs/drugs.module';

@Module({
  imports: [drugModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
