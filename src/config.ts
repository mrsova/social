export default () => ({
    google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        redirectUri: process.env.GOOGLE_REDIRECT_URI,
        loginUri: process.env.GOOGLE_LOGIN_URI,
        accessTokenUri: process.env.GOOGLE_ACCESS_TOKEN_URI,
    },
    facebook: {
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        redirectUri: process.env.FACEBOOK_REDIRECT_URI,
        loginUri: process.env.FACEBOOK_LOGIN_URI,
        accessTokenUri: process.env.FACEBOOK_ACCESS_TOKEN_URI,
    },
    apple: {
        clientId: process.env.APPLE_CLIENT_ID,
        privateKeyPath: process.env.APPLE_PRIVATE_KEY_PATH,
        teamId: process.env.APPLE_TEAM_ID,
        keyId: process.env.APPLE_KEY_ID,
        redirectUri: process.env.APPLE_REDIRECT_URI,
        loginUri: process.env.APPLE_LOGIN_URI,
        accessTokenUri: process.env.APPLE_ACCESS_TOKEN_URI,
    }
});