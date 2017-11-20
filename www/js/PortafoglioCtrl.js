
angular.module('starter.controllers')
.controller('PortafoglioCtrl', function($scope, $location, sharedProperties) {
  console.log(sharedProperties.getIdUtente());
  $scope.$root.showMenuIcon = true;

  $scope.logout = function() {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    $location.url('app');
  }

});
