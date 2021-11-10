import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import configuration from './config';
import {ConfigModule} from "@nestjs/config";
import {GoogleService} from "./services/google.service";
import {FacebookService} from "./services/facebook.service";
import {AppleService} from "./services/apple.service";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    })
  ],
  controllers: [AppController],
  providers: [
      GoogleService,
      FacebookService,
      AppleService
  ],
})
export class AppModule {}
