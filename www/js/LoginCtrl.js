
angular.module('starter.controllers')
.controller('LoginCtrl', function($scope, $http, $ionicPopup, $location, sharedProperties) {
  $scope.loginData={};
  //di default è impostato per ricordare le credenziali
  $scope.loginData.remember=true;
  
  //funzione per il login
  $scope.doLogin = function(){
    //ottiene l'id dell'utente dato username e password
    var link = "http://portafoglio.altervista.org/Login/getIdByUserAndPsw.php";

    $http.get(link,{
      params: {
        username: $scope.loginData.username,
        password: $scope.loginData.password
      }
    }).then(function(response){
      var id = response.data.id_utente;

      //viene ritornato id=-1 se l'username e la psw non corrispondono a nessuno
      if(id == -1){
        var alertPopup = $ionicPopup.alert({
          title: 'Errore',
          template: 'Username o password errati'
        });

        alertPopup.then(function(res) {
          $scope.loginData.username = $scope.loginData.password = "";
        });
      } else {
        //Salvo l'id nelle sharedProperties
        sharedProperties.setIdUtente(id);
        sharedProperties.setNome(response.data.nome);
        sharedProperties.setCognome(response.data.cognome);
        sharedProperties.setSaldo(response.data.saldo);

        if($scope.loginData.remember){
          localStorage.setItem("username", $scope.loginData.username);
          localStorage.setItem("password", $scope.loginData.password);
        }

        $location.path('app/profilo');
      }

    }).catch(function(error){
      console.log(error);
    });
  }

  if((localStorage.getItem("username") != undefined) && (localStorage.getItem("password") != undefined)){
    $scope.loginData.username = localStorage.getItem("username");
    $scope.loginData.password = localStorage.getItem("password");
    $scope.doLogin();
  }
});
