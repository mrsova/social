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
    }
});