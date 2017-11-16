//Andrea
.controller('LoginCtrl', function($scope, $http) {
  $scope.loginData={};
  $scope.login=function(){
    alert($scope.loginData.username);
  }
}
