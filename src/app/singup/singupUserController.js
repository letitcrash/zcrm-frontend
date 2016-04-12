'use strict';
angular.module('inspinia').controller("SignupUserCtrl", function($scope, $state, $window, signupServices, generalUtils, $rootScope) {
  console.log("SignupUserCtrl initializing");
  

  $scope.createUser = function() {
    var companyName, contactProfile, email, password, token, vatId;
    contactProfile = $scope.contactProfile;
    token = $scope.token;
    email = $scope.email;
    companyName = $scope.companyName;
    vatId = "default";
    contactProfile.email = email;
    password = $scope.password;
    return signupServices.activateUser(token, email, contactProfile, companyName, vatId, password).then(function(response) {
      console.log("success");
      return $window.location.href = '/#/login';
    }, function(response) {
      console.log("fail");
      return $window.location.href = '/#/login';
    });
  };
  $scope.init = function() {
    console.log("do something");
    $rootScope.isOnSignup = true;
    $scope.contactProfile = {};
    $scope.token = $state.params.token;
    $scope.email = $state.params.email;
    if (($scope.email == null) && ($scope.token == null)) {
      $rootScope.isOnSignup = false;
      $window.location.href = '/#/login';
    }
  };
  return $scope.init();
});

//# sourceMappingURL=signupUserController.js.map
