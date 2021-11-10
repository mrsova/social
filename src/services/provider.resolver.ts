import {GoogleProvider} from "./providers/google.provider";
import {FacebookProvider} from "./providers/facebook.provider";
import {AppleProvider} from "./providers/apple.provider";
import {ConfigService} from "@nestjs/config";
import {HttpException, HttpStatus, Injectable} from "@nestjs/common";

@Injectable()
export class ProviderResolver {
    constructor(private configService: ConfigService) {}

    getProvider(type: string): SocialProviderInterface {
        if (type == "google") {
            return new GoogleProvider(this.configService)
        }
        if (type == "facebook") {
            return new FacebookProvider(this.configService)
        }
        if (type == "apple") {
            return new AppleProvider(this.configService)
        }
        throw new HttpException('type is not defined', HttpStatus.BAD_REQUEST);
    }
}