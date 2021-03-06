Coinbase = {};

Coinbase.requestCredential = function (options, credentialRequestCompleteCallback) {

    if (!credentialRequestCompleteCallback && typeof options === 'function') {
        credentialRequestCompleteCallback = options;
        options = {};
    }

    var config = ServiceConfiguration.configurations.findOne({service: 'coinbase'});
    if (!config) {
        credentialRequestCompleteCallback && credentialRequestCompleteCallback(new ServiceConfiguration.ConfigError("Service not configured"));
        return;
    }

    var credentialToken = Random.id();
    var mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
    var display = mobile ? 'touch' : 'popup';
    var scope = '';

    if (options && options.requestPermissions) {
        scope = options.requestPermissions.join(',');
    }

    var loginUrl =
        'https://coinbase.com/oauth/authorize' +
            '?response_type=code' +
            '&client_id=' + config.appId +
            '&redirect_uri=' + Meteor.absoluteUrl('_oauth/coinbase?close');
            console.log(loginUrl);

    Oauth.initiateLogin(credentialToken, loginUrl, credentialRequestCompleteCallback);
};

















