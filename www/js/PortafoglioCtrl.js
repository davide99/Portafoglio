
angular.module('starter.controllers')
.controller('PortafoglioCtrl', function($scope, sharedProperties) {
  console.log(sharedProperties.getIdUtente());
});
