
angular.module('starter.controllers')
.controller('ProfiloCtrl', function($scope, $http, sharedProperties) {


  $scope.$root.showMenuIcon = true;

  $scope.id_utente = sharedProperties.getIdUtente();

  console.log(sharedProperties.getIdUtente());


  getUser();
  getMovimentiMese();

  console.log(sharedProperties.getIdUtente());


  function getUser(){
    var link = "http://portafoglio.altervista.org/getUserById.php";
  	$scope.utente = null;

    console.log($scope.id_utente);

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


    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

      // Create the data table.
      var data = new google.visualization.arrayToDataTable([
          ['Giorno', 'Entrate', 'Uscite'],
          ['14',  500, 100],
          ['15',  1500, 200],
          ['16',  0, 0],
          ['17',  2000, 1500],
          ['18',  0, 0],
          ['19',  0, 0],
          ['20',  450, 50]
        ]);

      // Set chart options
      var options = {
                      curveType: 'function',
                      animation: {duration: '500',startup:true},
                      chartArea:{left:50,width:'100%'},
                      width: '100%',
                      legend: { position: 'bottom' }};


      // Instantiate and draw our chart, passing in some options.
      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
      chart.draw(data, options);
    }



});
