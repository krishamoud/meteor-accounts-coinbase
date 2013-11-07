Package.describe({
    summary: "Login service for coinbase accounts"
});

Package.on_use(function(api) {
    api.use('accounts-base', ['client', 'server']);
    api.imply('accounts-base', ['client', 'server']);
    api.use('accounts-oauth', ['client', 'server']);

    api.use('oauth', ['client', 'server']);
    api.use('oauth2', ['client', 'server']);
    api.use('http', ['server']);
    api.use('underscore', 'server');
    api.use('templating', 'client');
    api.use('random', 'client');
    api.use('service-configuration', ['client', 'server']);
          
    api.add_files(
    ['lib/coinbase_configure.html', 'lib/coinbase_configure.js', 
    'lib/coinbase_login_button.css'],
    'client');

    api.add_files("lib/accounts_coinbase.js");
    api.add_files('lib/coinbase_client.js', 'client');
    api.add_files('lib/coinbase_server.js', 'server');
});
