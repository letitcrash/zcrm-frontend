'use strict';
angular
  .module('inspinia')
  .controller('SignupUserCtrl', function($state, $log, $window, signupServices, generalUtils, $rootScope) {
  var vm = this;
  $log.log('SignupUserCtrl initializing');

  vm.createUser = function() {
    var contactProfile = vm.contactProfile;
    var token = vm.token;
    var email = vm.email;
    var companyName = vm.companyName;
    var vatId = 'default';
    var password = vm.password;
    contactProfile.email = email;
    return signupServices.activateUser(token, email, contactProfile, companyName, vatId, password).then(function() {
      $log.log('success');
      return $window.location.href = '/#/login';
    }, function() {
      $log.log('fail');
    });
  };
  vm.submitForm = function() {
    if (vm.userForm.$valid) {
      $log.log('All fields are valid');
    }
  };
  vm.init = function() {
    $log.log('do something');
    $rootScope.isOnSignup = true;
    vm.contactProfile = {};
    vm.token = $state.params.token;
    vm.email = $state.params.email;
    if ((vm.email == null) && (vm.token == null)) {
      $rootScope.isOnSignup = false;
      $window.location.href = '/#/login';
    }
  };
  return vm.init();
});

//# sourceMappingURL=signupUserController.js.map
