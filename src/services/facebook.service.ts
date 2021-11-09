import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import axios from "axios";

@Injectable()
export class FacebookService {
    constructor(
        private configService: ConfigService,
    ) {}

    getRedirectUri(callbackUri) {
        let params = new URLSearchParams({
            client_id: this.configService.get(<string>('facebook.clientId')),
            state: callbackUri,
            redirect_uri: this.configService.get(<string>('facebook.redirectUri')),
        }).toString()

        return this.configService.get(<string>('facebook.loginUri')) + '?' + params;
    }

    async generateCallbackUri(code, uri) {
        try {
            const response = await this.getAccessToken(code)
            let params = new URLSearchParams({
                token: response.access_token,
                type: 'google',
            }).toString()
            return uri + '?' + params;

        } catch (err) {
            console.log(err.message)
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

    private async getAccessToken(code): Promise<any> {
        let params = new URLSearchParams({
            client_id: this.configService.get(<string>('facebook.clientId')),
            client_secret: this.configService.get(<string>('facebook.clientSecret')),
            redirect_uri: this.configService.get(<string>('facebook.redirectUri')),
            code: code,
        }).toString()
        return axios.post(this.configService.get(<string>('google.accessTokenUri')), {params}).then((response) => {
            return response.data
        })
    }
}