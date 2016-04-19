'use strict';

angular.module('inspinia')
  .controller('MainController', function ($http, $scope) {

    var vm = this;

    vm.userName = 'Example user';
    vm.helloText = 'Welcome in CRM SeedProject';
    vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

    $scope.apply = function(email) {
      
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
