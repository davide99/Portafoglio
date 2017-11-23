angular.module('starter.controllers')
.controller('ricercaCtrl', function($scope, $http) {
  var link = "http://portafoglio.altervista.org/select.php";
    $scope.categorie = null;
    $scope.visibile="none";
    $scope.cat="Ricerca per categoria...";
    $scope.data="Ricerca per data...";

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

$scope.carica=function(){
  if($scope.visibile=='block'){
    $scope.visibile='none';
  }
    var link1 = "http://portafoglio.altervista.org/ricercaPerTipo.php";
    $scope.movimenti = null;

    $http.get(link1,{
      params: {
        id_utente:1,
        tipo: $scope.cat


      }
    }).then(function(response){
      $scope.movimenti = response.data.movimenti;
      // getLongData();
      console.log($scope.movimenti);
    }).catch(function(error){
      console.log(error);
    });
  }

    // function getLongData(){
    //   var link = "http://portafoglio.altervista.org/getCronologia.php";
    //   $scope.movimenti = null;
    //
    //   var d=[];
    //   var o=[];
    //
    //   $http.get(link,{
    //     params: {
    //       id_utente:1
    //
    //     }
    //
    //
    //   }).then(function(response){
    //     $scope.movimenti = response.data.movimenti;
    //     for (var i = 0; i < $scope.movimenti.length; i++) {
    //       d[i]=$scope.movimenti[i].data.substring(0, 10);
    //       o[i]=$scope.movimenti[i].data.substring(11, 16);
    //       var parts = d[i].split("-"),
    //       dateLong = new Date(+parts[0], parts[1]-1, +parts[2]);
    //
    //       var data=dateLong.toString().substring(0,15);
    //       var ora=o[i];
    //
    //       $scope.movimenti[i].data=data+", "+ora;
    //
    //     }
    //
    //   }).catch(function(error){
    //     console.log(error);
    //   });
    //
    //
    // }









    $scope.setVisibile=function(){
      if($scope.visibile=='none'){
        $scope.visibile='block';
        $scope.movimenti=null;
      }else{
        $scope.visibile='none';

      }

    }


    $scope.selezionaCat=function(x){
      $scope.cat=x;
    }

    $scope.azzera=function(){
      $scope.cat="Ricerca per categoria...";
      $scope.data="Ricerca per data...";
      $scope.movimenti = null;
    }





})
