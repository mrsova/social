export default () => ({
    google: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: process.env.REDIRECT_URI,
        loginUri: process.env.LOGIN_URI,
        accessTokenUri: process.env.ACCESS_TOKEN_URI,
    },
});