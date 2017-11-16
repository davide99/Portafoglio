angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

//Controller per prendere utenti
//geheh
.controller('PlaylistsCtrl', function($scope, $http) {
	var link = "http://portafoglio.altervista.org/select.php";
	$scope.playlists = null;

	$http.get(link,{
		params: {
			tabella: 'utenti'
		}
	}).then(function(response){
		$scope.utenti = response.data.utenti;
		console.log($scope.utenti);
	}).catch(function(error){
		console.log(error);
	});

})
