
angular.module('starter.controllers')
.controller('EntrateCtrl', function($scope, sharedProperties) {
  $scope.id_utente=sharedProperties.getIdUtente();
  });
