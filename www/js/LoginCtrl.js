//Andrea
angular.module ('starter.controllers')
//Controllare il controller <---------------------------------------------
.controller('LoginCtrl', function($scope, $http) {
  $scope.loginData={};
$scope.login=function(){
  alert($scope.loginData.username);
}

  var link="http://portafoglio.altervista.org/select.php";
$http.get(link,{
  params: {
  tabella: 'utenti'
}

}).then(function(response){
  var utenti[] = response.data.utenti;
  for(var i=0;i<utenti.lenght;i++){
    if(utenti[i].username==$scope.loginData.username && utenti[i].password==$scope.loginData.password)
    alert("Ok");
    else {
      console.log("Errato");
    }
  }
}).catch(function(error){
  console.log(error);
});
}
