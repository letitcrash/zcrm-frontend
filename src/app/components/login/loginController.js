'use strict';


angular.module('inspinia')
  .controller('LoginCtrl', function ($http, $scope, LoginService) {


    $scope.login = function() {
     
      var data = {
        username: $scope.username,
        password: $scope.password
      }   


      console.log(data);

      $http({
        method: 'POST',
        url: 'http://desk-it.com:9000/login',
        data: data,
        headers: {
          "Content-Type": 'application/json'
          }
      }).then(function(response) {
                console.log(response);

      }, function(response) {
                console.log(response);

      });

      $state.go("index.main");

    } 

});    
