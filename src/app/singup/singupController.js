'use strict';


angular.module('inspinia')
  .controller('SignupCtrl', function ($http, $scope, $stateParams, $state) {



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

    $scope.register = function() {
      $scope.contactProfile.email = $scope.email;
      $scope.contactProfile.address = "";
      $scope.contactProfile.city = "";
      $scope.contactProfile.zipCode = "";
      $scope.contactProfile.phoneNumberMobile = "";
      $scope.contactProfile.phoneNumberHome = "";
      $scope.contactProfile.phoneNumberWork = "";

      var user = {
        token: $scope.token,
        password: $scope.password,
        email: $scope.email,
        contactProfile:$scope.contactProfile,
        companyName: $scope.companyName,
        vatId: "default"
      };
      
            console.log(user);

      $http({
        method: 'POST',
        url: 'http://desk-it.com:9000/activate-user',
        data: user,
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

  $scope.apply = function() {
      
      console.log($scope.email);

      var data = {
        email: $scope.email,
        url: 'http://localhost:8080/#/singup',
      };
      
      console.log("setting header");
      console.log(data);
      
      $http({
        method: 'POST',
        url: 'http://desk-it.com:9000/signup',
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

  $scope.init = function() {

    $scope.contactProfile = {};
    $scope.token = $state.params.token;
    $scope.email = $state.params.email;

  }

  $scope.init();

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