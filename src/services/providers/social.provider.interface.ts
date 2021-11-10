interface SocialProviderInterface {
    getRedirectUri(callbackUri)
    generateCallbackUri(code, uri)
}