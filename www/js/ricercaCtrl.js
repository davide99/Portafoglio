angular.module('starter.controllers')
.controller('ricercaCtrl', function($scope, $http) {
  var link = "http://portafoglio.altervista.org/select.php";
    $scope.categorie = null;
    $scope.visibile="none";

    $http.get(link,{
      params: {
        tabella: 'tipi'
      }
    }).then(function(response){
      var a = response.data.tipi;
      $scope.categorie = [];
      var size = 3;

      while (a.length > 0)
      $scope.categorie.push(a.splice(0, size));



      console.log($scope.categorie);
    }).catch(function(error){
      console.log(error);
    });

    $scope.setVisibile=function(){
      if($scope.visibile=='none'){
        $scope.visibile='block';
      }else{
        $scope.visibile='none';
      }
    }




})
