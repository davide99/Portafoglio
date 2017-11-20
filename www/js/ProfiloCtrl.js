
angular.module('starter.controllers')
.controller('ProfiloCtrl', function($scope, $http, sharedProperties) {

  getUser();
  getMovimentiMese();

  console.log(sharedProperties.getIdUtente());



  function getUser(){
    var link = "http://portafoglio.altervista.org/getUserById.php";
  	$scope.utente = null;

  	$http.get(link,{
  		params: {
  			id_utente: 1
  		}
  	}).then(function(response){
  		$scope.utente = response.data.utenti[0];
  		console.log($scope.utente);
  	}).catch(function(error){
  		console.log(error);
  	});
  }

  function getMovimentiMese(){
    var link = "http://portafoglio.altervista.org/getCronologia.php";
  	$scope.movimenti = null;

  	$http.get(link,{
  		params: {
        id_utente: 1,
        mese:11,
  		}
  	}).then(function(response){
  		$scope.movimenti = response.data.movimenti;
  		console.log($scope.movimenti);
  	}).catch(function(error){
  		console.log(error);
  	});
  }
});
