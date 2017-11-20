
angular.module('starter.controllers')
.controller('RegistrazioneCtrl', function($scope, $http, $ionicPopup, $location, sharedProperties) {
  $scope.data={};
console.log("1");

  $scope.bad = false;

  $scope.checkUsername = function(){
    var link = "http://portafoglio.altervista.org/Login/usernameTaken.php";

    $http.get(link,{
      params: {
        username: $scope.data.username,
      }
    }).then(function(response){
      var n = response.data.number;
      $scope.data.bad = !(n==0);

    }).catch(function(error){
      console.log(error);
    });
  }
});
