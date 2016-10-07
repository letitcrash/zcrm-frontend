'use strict';
angular
  .module('inspinia')
  .controller('PasswordRecoveryCtrl', function($state, $log, passwordServices, routeService) {
    var vm = this;

    vm.recoverPassword = function(password, confirmPassword) {
      var token, userId;
      userId = $state.params.userId;
      token = $state.params.token;

      if (password === confirmPassword) {
        return passwordServices.recoverPassword(userId, token, password).then(function() {
          $log.log('Password recovery success');
          vm.setAlertPwd(true, 'Lösenordet har uppdaterats.');
          return routeService.toLogin();
        }, function(response) {
          $log.log('Password recovery fail');
          vm.response = response;
          if (response.data.response_code === '-23') {
            return vm.setAlertPwd(false, 'Länken är inte längre giltig!');
          } else {
            return vm.setAlertPwd(false, 'Lösenordet kunde inte uppdateras.');
          }
        });
      } else {
        return vm.setAlertPwd(false, 'Lösenorden matchar inte.');
      }
    };
    vm.setAlertPwd = function(success, message) {
      vm.alertPwd = {};
      if (success) {
        return vm.alertPwd.success = message;
      } else {
        return vm.alertPwd.failed = message;
      }
    };
    vm.init = function() {
      $log.log('init password recovery');
      $log.log($state);

    };
   vm.init();
  });

  //# sourceMappingURL=PasswordRecoveryCtrl.js.map
