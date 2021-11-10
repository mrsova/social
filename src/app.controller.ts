import {Controller, Get, HttpException, HttpStatus, Param, Query, Redirect} from '@nestjs/common';
import {ProviderResolver} from "./services/provider.resolver";

@Controller()
export class AppController {
    constructor(
        private readonly providerResolver: ProviderResolver,
    ) {}

    @Get()
    index() {
        return ''
    }

    @Get('auth/redirect-social')
    @Redirect()
    redirectSocial(@Query() query) {
        if (typeof query.callbackUri == "undefined") {
            throw new HttpException('callbackUri is required', HttpStatus.BAD_REQUEST)
        }
        if (typeof query.type == "undefined") {
            throw new HttpException('type is required', HttpStatus.BAD_REQUEST)
        }
        let callbackUri = Buffer.from(query.callbackUri).toString('base64')
        let type = query.type

        let redirectUri = this.providerResolver.getProvider(type).getRedirectUri(callbackUri)

        return {
            statusCode: HttpStatus.FOUND,
            url: redirectUri
        }
    }

    @Get('auth/:social-callback')
    @Redirect()
    async callback(
        @Query() query,
        @Param('social') social: string
    ) {
        let uri = Buffer.from(query.state, 'base64').toString('ascii')
        let code = query.code

        let callbackUri = await this.providerResolver.getProvider(social).generateCallbackUri(code, uri)

        return {
            statusCode: HttpStatus.FOUND,
            url: callbackUri,
        }
    }
}
