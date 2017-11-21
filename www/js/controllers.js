angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $ionicSideMenuDelegate, sharedProperties) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.$ionicSideMenuDelegate = $ionicSideMenuDelegate;

  $scope.menu = {};
  $scope.menu.nome = "Pippo";
  $scope.menu.cognome = "Pluto";
  $scope.menu.saldo = "20€";

  $scope.$watch(function () {
    return $ionicSideMenuDelegate.isOpenLeft();
  },
     function (isOpen) {
      if (isOpen){
        $scope.menu.nome = sharedProperties.getNome();
        $scope.menu.cognome = sharedProperties.getCognome();
        $scope.menu.saldo = sharedProperties.getSaldo();
        $scope.menu.id = sharedProperties.getIdUtente();
      }
  });

});
