angular.module('starter.controllers')
.controller('CronologiaUsciteCtrl', function($scope, $http) {
  console.log("Entrate");
  var link = "http://portafoglio.altervista.org/select.php";
  $scope.uscite = null;

  $http.get(link,{
    params: {
      tabella: 'uscite'
    }
  }).then(function(response){
    $scope.uscite = response.data.uscite;
    console.log($scope.uscite);
  }).catch(function(error){
    console.log(error);
  });
})
