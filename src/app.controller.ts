import {Controller, Get, HttpException, HttpStatus, Query, Redirect} from '@nestjs/common';
import {GoogleService} from "./services/google.service";
import {FacebookService} from "./services/facebook.service";
import {AppleService} from "./services/apple.service";

@Controller()
export class AppController {
    constructor(
        private readonly googleService: GoogleService,
        private readonly facebookService: FacebookService,
        private readonly appleService: AppleService,

    ) {}

    @Get()
    index() {
        return ''
    }

    @Get('auth/redirect-social')
    @Redirect()
    redirectSocial(@Query() query) {
        if (typeof query.callbackUri == "undefined") {
            throw new HttpException('callbackUri is required', HttpStatus.BAD_REQUEST);
        }
        if (typeof query.type == "undefined") {
            throw new HttpException('type is required', HttpStatus.BAD_REQUEST);
        }

        let callbackUri = Buffer.from(query.callbackUri).toString('base64')

        let type = query.type

        if (type == "google") {
            return {
                statusCode: HttpStatus.FOUND,
                url: this.googleService.getRedirectUri(callbackUri),
            }
        }
        if (type == "facebook") {
            return {
                statusCode: HttpStatus.FOUND,
                url: this.facebookService.getRedirectUri(callbackUri),
            }
        }

        if (type == "apple") {
            return {
                statusCode: HttpStatus.FOUND,
                url: this.appleService.getRedirectUri(callbackUri),
            }
        }

        throw new HttpException('type is not defined', HttpStatus.BAD_REQUEST);
    }

    @Get('auth/google-callback')
    @Redirect()
    async googleCallback(
        @Query() query
    ) {
        let uri = Buffer.from(query.state, 'base64').toString('ascii')
        let code = query.code
        let callbackUri = await this.googleService.generateCallbackUri(code, uri)

        return {
            statusCode: HttpStatus.FOUND,
            url: callbackUri,
        }
    }

    @Get('auth/facebook-callback')
    @Redirect()
    async facebookCallback(
        @Query() query
    ) {
        let uri = Buffer.from(query.state, 'base64').toString('ascii')
        let code = query.code
        let callbackUri = await this.facebookService.generateCallbackUri(code, uri)

        return {
            statusCode: HttpStatus.FOUND,
            url: callbackUri,
        }
    }

    @Get('auth/apple-callback')
    @Redirect()
    async appleCallback(
        @Query() query
    ) {
        let uri = Buffer.from(query.state, 'base64').toString('ascii')
        let code = query.code
        let callbackUri = await this.appleService.generateCallbackUri(code, uri)

        return {
            statusCode: HttpStatus.FOUND,
            url: callbackUri,
        }
    }

}
