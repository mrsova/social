import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import configuration from './config';
import {ConfigModule} from "@nestjs/config";
import {ProviderResolver} from "./services/provider.resolver";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    })
  ],
  controllers: [AppController],
  providers: [
      ProviderResolver,
  ],
})
export class AppModule {}
