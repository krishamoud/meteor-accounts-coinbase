Accounts.oauth.registerService('coinbase');

if (Meteor.isClient) {
    Meteor.loginWithCoinbase = function(options, callback) {
        // support a callback without options
        if (! callback && typeof options === "function") {
            callback = options;
            options = null;
        }

        var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);
        Coinbase.requestCredential(options, credentialRequestCompleteCallback);
    };
} else {
    Accounts.addAutopublishFields({
        forLoggedInUser: ['services.coinbase'],
        forOtherUsers: [
            'services.coinbase.id',
            'services.coinbase.email'
        ]
    });
}
