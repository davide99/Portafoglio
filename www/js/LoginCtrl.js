
angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $rootScope, $http, $ionicPopup, $location) {
  $scope.loginData={};

  if((localStorage.getItem("username") != undefined) && (localStorage.getItem("password") != undefined)){
    $scope.loginData.username = localStorage.getItem("username");
    $scope.loginData.password = localStorage.getItem("password");
  }

  $scope.doLogin = function(){
    var link = "http://portafoglio.altervista.org/Login/getIdByUserAndPsw.php";

    $http.get(link,{
      params: {
        username: $scope.loginData.username,
        password: $scope.loginData.password
      }
    }).then(function(response){
      var id = response.data.id_utente;

      if(id == -1){
        var alertPopup = $ionicPopup.alert({
          title: 'Errore',
          template: 'Username o password errati'
        });

        alertPopup.then(function(res) {
          $scope.loginData.username = $scope.loginData.password = "";
        });
      }else {
        $rootScope.id_utente = id;
        if($scope.loginData.remember){
          localStorage.setItem("username", $scope.loginData.username);
          localStorage.setItem("password", $scope.loginData.password);
        }else{
          localStorage.removeItem("username");
          localStorage.removeItem("password");
        }
        $location.url('app/portafoglio');
      }

    }).catch(function(error){
      console.log(error);
    });
  }
});
