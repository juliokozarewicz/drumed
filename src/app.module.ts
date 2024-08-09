import { Module } from '@nestjs/common';
import { drugModule } from './modules/drugs/drugs.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AccountsModule } from './modules/accounts/accounts.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    
    ConfigModule.forRoot(),

    ThrottlerModule.forRoot([{
      ttl: 600000,
      limit: 100,
    }]),

    drugModule,
    AccountsModule,
  
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: Boolean(process.env.DEBUG),
    } as TypeOrmModuleOptions)

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
