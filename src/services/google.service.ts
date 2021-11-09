import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import axios from "axios";

@Injectable()
export class GoogleService {
    constructor(
        private configService: ConfigService,
    ) {}

    getRedirectUri(callbackUri) {
        let params = new URLSearchParams({
            client_id: this.configService.get(<string>('google.clientId')),
            scope: 'https://www.googleapis.com/auth/userinfo.profile',
            state: callbackUri,
            response_type: 'code',
            redirect_uri: this.configService.get(<string>('google.redirectUri')),
        }).toString()

        return this.configService.get(<string>('google.loginUri')) + '?' + params;
    }

    async generateCallbackUri(code, uri) {
        try {
            const response = await this.getAccessToken(code)
            let params = new URLSearchParams({
                token: response.id_token,
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
            client_id: this.configService.get(<string>('google.clientId')),
            client_secret: this.configService.get(<string>('google.clientSecret')),
            redirect_uri: this.configService.get(<string>('google.redirectUri')),
            code: code,
            grant_type: 'authorization_code',
        }).toString()
        return axios.post(this.configService.get(<string>('google.accessTokenUri')), params, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then((response) => {
            return response.data
        })
    }
}