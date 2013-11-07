Template.configureLoginServiceDialogForCoinbase.siteUrl = function () {
        return Meteor.absoluteUrl();
};

Template.configureLoginServiceDialogForCoinbase.fields = function () {
  return [
      {property: 'appId', label: 'Client id '},
      {property: 'secret', label: 'Secret Key'}
  ];
};
