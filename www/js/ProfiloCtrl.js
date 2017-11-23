
angular.module('starter.controllers')
.controller('ProfiloCtrl', function($scope, $http, sharedProperties) {
  $scope.tabAttivo = 1;

  $scope.$root.showMenuIcon = true;

  $scope.id_utente = sharedProperties.getIdUtente();
  var entrateTot = 0;
  var usciteTot = 0;
  var categorie = [];
  $scope.statisticheMovimenti = [];

  // Load the Visualization API and the corechart package.
  google.charts.load('current', {'packages':['corechart']});

  // console.log(sharedProperties.getIdUtente());


  getUser();
  var d = new Date();
  d.setHours(0,0,0,0);
  var month = d.getMonth()+1;

  // console.log(sharedProperties.getIdUtente());


  function getUser(){
    var link = "http://portafoglio.altervista.org/getUserById.php";
    $scope.utente = null;

    // console.log($scope.id_utente);

    $http.get(link,{
      params: {
        id_utente: $scope.id_utente
      }
    }).success(function(data){
      $scope.utente = data.utenti[0];
      getMovimenti(month,"","");
      // console.log($scope.utente);
    }).catch(function(error){
      console.log(error);
    });
  }

  function getMovimenti(mese,settimana,giorno){
    var link = "http://portafoglio.altervista.org/getCronologia.php";
    $scope.movimenti = null;

    $http.get(link,{
      params: {
        id_utente: $scope.id_utente,
        mese:mese,
        // settimana:settimana,
        giorno:giorno
      }
    }).success(function(data){
      $scope.movimenti = data.movimenti;
      $scope.selezionaPeriodo($scope.tabAttivo);
      console.log($scope.movimenti);
    }).catch(function(error){
      console.log(error);
    });
  }

  function drawMovimentiChart() {
    // Create the data table.
    var data = new google.visualization.arrayToDataTable($scope.datiMovimenti);

    // Set chart options
    var options = {
      animation: {duration: '500',startup:true},
      chartArea:{left:50,width:'100%'},
      width: '100%',
      legend: { position: 'bottom' },
      vAxis: {format: 'currency'}
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.AreaChart(document.getElementById('movimenti_chart_div'));
    chart.draw(data, options);
  }

  function drawCategorieChart() {
    // Create the data table.
    var data = new google.visualization.arrayToDataTable($scope.datiCategorie);

    // Set chart options
    var options = {
      animation: {duration: '500',startup:true},
      chartArea:{width:'100%'},
      width: '110%',
      pieHole: 0.4,
    };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.PieChart(document.getElementById('categorie_chart_div'));
    chart.draw(data, options);
  }


  var index = 0;

  $scope.selezionaPeriodo=function(tab){

    $scope.tabAttivo = tab;
    entrateTot = 0;
    usciteTot = 0;
    categorie = [['Categoria','Importo']];
    index = 1;
    setUpGraficoMovimenti();
    setUpGraficoCategorie();


  }

  function setUpGraficoMovimenti() {
    var tab = $scope.tabAttivo;
    $scope.datiMovimenti = [['Giorno', 'Entrate', 'Uscite']];
    $scope.datiCategorie = [['Categoria', 'Importo']];

    if (tab==1) {
      for (var i = 1; i < 32; i++) {
        var entryMovimento = creaVettoreGiornoMese(i);
        $scope.datiMovimenti.push(entryMovimento);
      }

      // for (var i = 0; i < categorie.length; i++) {
      //   console.log(categorie[i][0]);
      // }

      // var indexes = [];
      // for (var i = 1; i < categorie.length; i++) {
      //   for (var j = 1; j < categorie.length; j++) {
      //     if (categorie[i].indexOf(categorie[j][0]) != -1 && i!=j) {
      //       indexes.push([i,categorie[i][0],categorie[i][1]]);
      //     }
      //   }
      //
      // }
      // // console.log(indexes.length);
      //
      // for (var i = 0; i < indexes.length; i++) {
      //   //SPLICE(index,1)
      //   // console.log(indexes[i]);
      //   var newIndex;
      //   for (var j = 0; j < indexes.length; j++) {
      //     if (indexes[i][0] == indexes[j][0]) {
      //       newIndex = indexes[j][0];
      //       console.log(newIndex);
      //       // console.log(indexes[j]);
      //     }
      //   }
      //
      //
      //
      // }





      // console.log($scope.datiCategorie);

    }else if(tab==2){
      for (var i = 0; i < 7; i++) {
        var entryMovimento = creaVettoreGiornoSettimana(i);
        $scope.datiMovimenti.push(entryMovimento);
      }

    }else{
      $scope.datiMovimenti = [['Ora', 'Entrate', 'Uscite']];
      for (var i = 0; i < 25; i++) {
        var entryMovimento = creaVettoreGiorno(i);
        $scope.datiMovimenti.push(entryMovimento);
      }

    }

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawMovimentiChart);
  }

  function setUpGraficoCategorie(){

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawCategorieChart);

  }


  //*************************//
  //FUNZIONI PER CREARE LE entryMovimento PER IL GRAFICO
  //*************************//
  function creaVettoreGiornoMese(giorno){

    var movimenti = $scope.movimenti
    var entrate = 0;
    var uscite = 0;

    for (var i = 0; i < movimenti.length; i++) {
      if (getDayOfMonth(movimenti[i].data)==giorno) {
        if (movimenti[i].importo > 0) {
          entrate += parseFloat(movimenti[i].importo);
        }else{
          uscite += parseFloat(movimenti[i].importo);

          // var vettSoloCat = [];
          // for (var i = 0; i < categorie.length; i++) {
          //   vettSoloCat.push(categorie[i][0]);
          // }
          //
          // console.log(vettSoloCat);

          // console.log(categorie.length);
          // console.log(categorie[0].indexOf(movimenti[i].tipo));

          // for (var j = 0; j < vettSoloCat.length; j++) {
          //   console.log(j);
          //   console.log(movimenti[i].tipo, categorie[j]);
          //   if (vettSoloCat.indexOf(movimenti[i].tipo) == -1) {
          //     categorie.push([movimenti[i].tipo,-parseFloat(movimenti[i].importo)]);
          //     j++;
          //     break;
          //   }else{
          //     console.log(movimenti[i].tipo);
          //   }
          // }


          // categorie.push([movimenti[i].tipo,-parseFloat((movimenti[i].importo))]);
          // for (var j = index; j > 1; j--) {
          //   if (categorie[j].indexOf(movimenti[i].tipo) != -1) {
          //     console.log();
          //   }
          // }


        }
      }
    }



    entrateTot += entrate;
    usciteTot += uscite;

    $scope.datiCategorie = categorie;

    $scope.statisticheMovimenti = [{nome:"Entrate",importo:entrateTot},{nome:"Uscite",importo:usciteTot},{nome:"Bilancio",importo:entrateTot+usciteTot}];

    // console.log(String(giorno),entrate,uscite);

    return [String(giorno),entrate,uscite];
  }

  function creaVettoreGiornoSettimana(giorno){

    var curr = d; // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6
    firstday = new Date(curr.setDate(first));
    lastday = new Date(curr.setDate(curr.getDate()+6));

    // console.log("first" , firstday);
    // console.log("last" , lastday);
    // var currentDate = new Date($scope.movimenti[5].data);
    // console.log("current" , currentDate);
    //
    // console.log(new Date($scope.movimenti[5].data) >= firstday);
    // console.log(new Date($scope.movimenti[1].data) <= lastday);

    var giorni = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    var movimenti = $scope.movimenti
    var entrate = 0;
    var uscite = 0;

    for (var i = 0; i < movimenti.length; i++) {
      if ((new Date(movimenti[i].data) >= firstday && new Date(movimenti[i].data) <= lastday)) {
        // console.log("in settimana");
        if (getDayOfWeek(movimenti[i].data)==giorni[giorno]) {
          if (movimenti[i].importo > 0) {
            entrate += parseFloat(movimenti[i].importo);
          }else{
            uscite += parseFloat(movimenti[i].importo);
          }
        }
      }
    }

    entrateTot += entrate;
    usciteTot += uscite;

    $scope.statisticheMovimenti = [{nome:"Entrate",importo:entrateTot},{nome:"Uscite",importo:usciteTot},{nome:"Bilancio",importo:entrateTot+usciteTot}];


    // console.log(String(giorni[giorno]),entrate,uscite);

    return [String(giorni[giorno]),entrate,uscite];
  }

  function creaVettoreGiorno(ora){

    var start = new Date();
    start.setHours(0,0,0,0);

    var end = new Date();
    end.setHours(23,59,59,999);
    // console.log("start", start);
    // console.log("end" , end);
    var movimenti = $scope.movimenti
    var entrate = 0;
    var uscite = 0;
    // console.log(getHourOfDay(movimenti[2].data));

    for (var i = 0; i < movimenti.length; i++) {
      if ((new Date(movimenti[i].data) >= start && new Date(movimenti[i].data) <= end)) {
        if (getHourOfDay(movimenti[i].data)==ora) {
          if (movimenti[i].importo > 0) {
            entrate += parseFloat(movimenti[i].importo);
          }else{
            uscite += parseFloat(movimenti[i].importo);
          }
        }
      }
    }

    entrateTot += entrate;
    usciteTot += uscite;

    // console.log(String(ora),entrate,uscite);

    $scope.statisticheMovimenti = [{nome:"Entrate",importo:entrateTot},{nome:"Uscite",importo:usciteTot},{nome:"Bilancio",importo:entrateTot+usciteTot}];


    return [String(ora),entrate,uscite];
  }

  //Dalla data ottengo il giorno es. 2017-11-22 10:39:00 mi ritorna 22
  function getDayOfMonth(data){
    return data.split("-")[2].substring(0,2);
  }

  //Dalla data ottengo il giorno della settimana es. 2017-11-22 10:39:00 mi ritorna Wed
  function getDayOfWeek(date) {
    var dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek) ? null : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek];
  }

  //Dalla data ottengo l'ora del giorno es. 2017-11-22 10:39:00 mi ritorna 10
  function getHourOfDay(data){
    return data.split("-")[2].substring(2,5);
  }

});

Date.prototype.getWeek = function() {
  var jan4th = new Date(this.getFullYear(),0,4);
  return Math.ceil((((this - jan4th) / 86400000) + jan4th.getDay()+1)/7);
}
