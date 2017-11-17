
angular.module('starter.controllers')
.controller('ProfiloCtrl', function($scope, $http) {
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
});
