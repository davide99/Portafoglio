angular.module('starter.controllers')
.controller('CronologiaEUCtrl', function($scope, $http) {
  var link = "http://portafoglio.altervista.org/getCronologia.php";
  $scope.movimenti = null;

  $http.get(link,{
    params: {
      id_utente:1
      
    }
  }).then(function(response){
    $scope.movimenti = response.data.movimenti;
    console.log($scope.movimenti);
  }).catch(function(error){
    console.log(error);
  });
})
