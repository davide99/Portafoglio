
angular.module('starter.controllers')
.controller('RegistrazioneCtrl', function($scope, $http, $ionicPopup, $location, sharedProperties) {
  $scope.data={};
  $scope.bad = false;
  var called = false;

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

  $scope.registra = function(){

    if(!called)
      called = true;
    else
      return;

    var link = "http://portafoglio.altervista.org/insert.php";

    if($scope.data.password != $scope.data.password1){
      var alertPopup = $ionicPopup.alert({
        title: 'Errore',
        template: 'Le password non corrispondono'
      });

      return;
    }

    if($scope.data.username == "" || $scope.data.password == "" ||
    $scope.data.nome == "" || $scope.data.cognome == "" ||
    $scope.data.saldo == "" || $scope.data.email == ""){

      var alertPopup = $ionicPopup.alert({
        title: 'Errore',
        template: 'Compilare tutti i campi'
      });

      return;
    }

    $http.get(link,{
      params: {
        tabella: "utenti",
        username: $scope.data.username,
        password: $scope.data.password,
        nome: $scope.data.nome,
        cognome: $scope.data.cognome,
        saldo: $scope.data.saldo,
        email: $scope.data.email
      }
    }).then(function(response){

      link = "http://portafoglio.altervista.org/Login/getIdByUserAndPsw.php";

      $http.get(link,{
        params: {
          username: $scope.data.username,
          password: $scope.data.password
        }
      }).then(function(response){
        var id = response.data.id_utente;
        sharedProperties.setIdUtente(id);
        sharedProperties.setNome(response.data.nome);
        sharedProperties.setCognome(response.data.cognome);
        sharedProperties.setSaldo(response.data.saldo);

        var fd = new FormData();
        //Take the first selected file
        fd.append("photo", document.getElementById('photo').files[0]);
        fd.append("id", id);
        var uploadUrl = 'http://portafoglio.altervista.org/Login/uploadPhoto.php';

        $http.post(uploadUrl, fd, {
            headers: {'Content-Type': undefined },
            transformRequest: angular.identity
        });


        $location.path('app/profilo');

      }).catch(function(error){
        console.log(error);
      });

    }).catch(function(error){
      console.log(error);
    });
  }
});
