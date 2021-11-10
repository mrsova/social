import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import axios from "axios";
import * as Jwt from "jsonwebtoken"
import {JwtPayload} from "jsonwebtoken";
import * as fs from "fs";

@Injectable()
export class AppleService {
    constructor(
        private configService: ConfigService,
    ) {}

    getRedirectUri(callbackUri) {
        let params = new URLSearchParams({
            client_id: this.configService.get(<string>('apple.clientId')),
            state: callbackUri,
            response_type: 'code',
            response_mode: 'query',
            redirect_uri: this.configService.get(<string>('apple.redirectUri')),
        }).toString()

        return this.configService.get(<string>('apple.loginUri')) + '?' + params;
    }

    async generateCallbackUri(code, uri) {
        try {
            const response = await this.getAccessToken(code)
            let params = new URLSearchParams({
                token: response.access_token,
                type: 'Apple',
            }).toString()
            return uri + '?' + params;

        } catch (err) {
            console.log(err.message)
            throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
        }
    }

     private generateSecretKey(): string {
         const privateKey = fs.readFileSync(this.configService.get(<string>('apple.privateKeyPath'))).toString();
         const headers = {
             alg: "ES256",
             kid: this.configService.get(<string>('apple.keyId')),
             typ: undefined // is there another way to remove type?
         }
         const claims = {
             iss: this.configService.get(<string>('apple.teamId')),
             aud: 'https://appleid.apple.com',
             sub: this.configService.get(<string>('apple.clientId')),
         }
         return Jwt.sign(claims, privateKey, {
              algorithm: "ES256",
              header: headers,
              expiresIn: "24h"
         });
    }

    private async getAccessToken(code): Promise<any> {
        const clientSecret = this.generateSecretKey()

        let params = new URLSearchParams({
            client_id: this.configService.get(<string>('apple.clientId')),
            client_secret: clientSecret,
            redirect_uri: this.configService.get(<string>('apple.redirectUri')),
            code: code,
            grant_type: 'authorization_code',
        }).toString()
        return axios.post(this.configService.get(<string>('apple.accessTokenUri')), params, {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then((response) => {
            return response.data
        })
    }
}