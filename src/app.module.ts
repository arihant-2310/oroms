import { Module } from '@nestjs/common';
import { RoomsModule } from './rooms/rooms.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';

@Module({

  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RoomsModule
  ],
})
export class AppModule {}
