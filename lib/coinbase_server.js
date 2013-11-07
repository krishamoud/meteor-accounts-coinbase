Coinbase = {};

Oauth.registerService('coinbase', 2, null, function(query) {

    var response    = getTokenResponse(query);
    var accessToken = response.accessToken;
                
                
    var serviceData = {
        access_token: accessToken,
        token_type: tokenType,
        refresh_token: refresh_token,
        expire_in: expire_in,
        scope: scope
        
    };

    var whiteListed = ['first_name', 'last_name'];

    var fields = _.pick(whiteListed);
    _.extend(serviceData, fields);

    serviceData.id = serviceData.uid;
    delete serviceData.uid;

    return {
        serviceData: serviceData,
        options: {
            profile: {
                profile: fields
            }
        }
    };
});

// returns an object containing:
// - accessToken
// - expiresIn: lifetime of token in seconds
var getTokenResponse = function (query) {
    var config = ServiceConfiguration.configurations.findOne({service: 'coinbase'});
    if (!config) {
        throw new ServiceConfiguration.ConfigError("Service not configured");
    }

    var responseContent;

    try {
        // Request an access token
        responseContent = HTTP.post(
            "https://coinbase.com/oauth/token", {
                params: {
                    client_id:     config.appId,
                    client_secret: config.secret,
                    code:          code,
                    grant_type:         'authorization_code',
                    redirect_uri: Meteor.absoluteUrl("_oauth/coinbase?close=close?code=CODE")
                }
            }).content;

    } catch (err) {
        throw _.extend(new Error("Failed to complete OAuth handshake with coinbase. " + err.message),
            {response: err.response});
    }
    // Success!  Extract the coinbase access token and key
    // from the response
    var parsedResponse = JSON.parse(responseContent);

    var coinbaseAccessToken = parsedResponse.access_token;
    var coinbase_id = parsedResponse.coinbase_user_id;
    var coinbase_publishable_key = parsedResponse.coinbase_publishable_key;

    if (!coinbaseAccessToken) {
        throw new Error("Failed to complete OAuth handshake with coinbase " +
           "-- can't find access token in HTTP response. " + responseContent);
    }
    return {
        access_token: accessToken
    };
};




Coinbase.retrieveCredential = function(credentialToken) {
    return Oauth.retrieveCredential(credentialToken);
};
