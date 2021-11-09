import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import configuration from './config';
import {ConfigModule} from "@nestjs/config";
import {GoogleService} from "./services/google.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    })
  ],
  controllers: [AppController],
  providers: [
      GoogleService
  ],
})
export class AppModule {}
