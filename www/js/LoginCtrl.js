
angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $rootScope, $http, $ionicPopup, $location) {
  $scope.loginData={};

  $scope.doLogin = function(){
    var usr = $scope.loginData.username;
    var psw = $scope.loginData.password;
    var link = "http://portafoglio.altervista.org/Login/getIdByUserAndPsw.php";

    $http.get(link,{
      params: {
        username: usr,
        password: psw
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
        $location.url('app/portafoglio');
      }

    }).catch(function(error){
      console.log(error);
    });
  }
});
