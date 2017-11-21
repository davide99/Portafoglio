
angular.module('starter.controllers')
.controller('EntrateCtrl', function($scope, sharedProperties, $http) {
  $scope.inserisci = function(){
    $scope.id_utente=sharedProperties.getIdUtente();
    var link1 = "http://portafoglio.altervista.org/update.php";
    var link2= "http://portafoglio.altervista.org/select.php";
    $scope.entrate=null;
    $scope.importo = 0;
    $http.get(link2,{
        params: {
          tabella:'utenti',
          id_utente: $scope.id_utente
        }
        }).then(function(response){
          var saldo = response.data.utenti.saldo;
          var nuovo_saldo = saldo + $scope.importo;
          console.log('nuovo_saldo',$scope.importo);
          console.log('saldo',response.data);
        /*  $.post(link,importo){
            $http.get(link1,{
              params: {
                tabella: 'entrate',
                importo:  nuovo_saldo
              }
            }).then(function(response){
          })

        }*/
        })
    }
  });
