z//Antonio
angular.module('starter.controllers')
.controller('UsciteCtrl', function($scope, $http) {
<<<<<<< HEAD
=======
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
>>>>>>> 224b431bdbb899608356e48a656fb9f27a843d2e


});
