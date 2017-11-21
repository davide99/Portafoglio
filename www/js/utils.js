angular.module('starter')
    .factory('utils', ['$http', function($http) {

    var urlBase = 'http://portafoglio.altervista.org/';

    this.checkUsername = function (username) {
      var params = {
        params: {
          username : username
        }
      };
        return $http.get(urlBase + "Login/usernameTaken.php", params);
    };

    this.addNewUser = function(username, password, nome, cognome, email, saldo, photo){
      var fd = new FormData();
      fd.append("username", username);
      fd.append("password", password);
      fd.append("nome", nome);
      fd.append("cognome", cognome);
      fd.append("email", email);
      fd.append("saldo", saldo);
      fd.append("photo", photo);

      return $http.post(urlBase + "Login/newUser.php", fd, {
          headers: {'Content-Type': undefined },
          transformRequest: angular.identity
      });
    }

    return this;
}]);
