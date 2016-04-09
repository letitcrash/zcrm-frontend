'use strict';


angular.module('inspinia')
  .controller('SignupCtrl', function ($http, $scope, $state) {


    $scope.register = function() {
      
      console.log($scope.token);
      
      var user = {
        token: $scope.token,
        password: $scope.password,
        email: $scope.email,
        token: $scope.token,
        url: "https://crm-multimedianordic.c9users.io/"
      };
      
      


      $state.go("index.main");

	}    

    $scope.apply = function() {
      
      console.log($scope.email);

      var data = {
        email: $scope.email,
        url: "https://crm-multimedianordic.c9users.io/"
      };
      
      console.log("setting header");
      console.log(data);
      
      $http({
        method: 'POST',
        url: 'https://crm-multimedianordic.c9users.io:8081/signup',
        data: data,
        headers: {
          "Content-Type": 'application/json'
          }
      }).then(function(response) {
          			console.log(response);

      }, function(response) {
          			console.log(response);

      });

	}

});

/*
angular
    .module('inspinia')
	.controller('LoginCtrl', ($http, $scope, $state, $location, singupService) => {
  
  $scope.loginSubmit = () => {
    singupService.getUserCredentials().then((users)=>{
      
      var data = {
        login: $scope.username,
        password: $scope.password
      };

      users.forEach((user)=>{
        var userCredential = (data.login === user.login && data.password === user.password); 
        if(userCredential) singupService.signIn(user.login);
      });

    });
  };

});
*/