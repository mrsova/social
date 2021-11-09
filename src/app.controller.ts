import {Controller, Get, HttpException, HttpStatus, Query, Redirect} from '@nestjs/common';
import {GoogleService} from "./services/google.service";

@Controller()
export class AppController {
    constructor(
        private readonly googleService: GoogleService
    ) {}

    @Get()
    index() {
        return ''
    }

    @Get('auth/redirect-social')
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
            return this.googleService.getRedirectUri(callbackUri);
        }

    }

    @Get('auth/google-callback')
    @Redirect()
    googleCallback(
        @Query() query
    ) {
        let uri = Buffer.from(query.state, 'base64').toString('ascii')
        let code = query.code
        let callbackUri = this.googleService.generateCallbackUri(code, uri)

        return {
            statusCode: HttpStatus.FOUND,
            url: callbackUri,
        }
    }

}
