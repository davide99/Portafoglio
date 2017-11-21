
angular.module('starter.controllers')
.controller('UsciteCtrl', function($scope, sharedProperties) {
$scope.id_utente=sharedProperties.getIdUtente();
});
