'use strict';

angular.module('inspinia')
  .controller('MainController', function ($http, $scope) {

    var vm = this;

    vm.userName = 'Example user';
    vm.helloText = 'Welcome in INSPINIA Gulp SeedProject';
    vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

    $scope.apply = function() {

      var data = {
        login: $scope.email,
        url: "https://crm-multimedianordic.c9users.io/"
      };

      var res = $http.post('https://crm-multimedianordic.c9users.io:8081/singup', data);
		res.success(function(data, status, headers, config) {
			console.log(data);
		});
		res.error(function(data, status, headers, config) {
			alert( "failure message: " + JSON.stringify({data: data}));
		});		

	}


  });
