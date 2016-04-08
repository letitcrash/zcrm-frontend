'use strict';


'use strict';

angular.module('inspinia').controller('signupController', function($http, Session, singupService) {
    

  	$scope.apply = function() {
		console.log("ss")
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