'use strict';
angular.module('inspinia').controller("PasswordRecoveryCtrl", function($scope, $state, passwordServices, routeService) {
  $scope.recoverPassword = function(password, confirmPassword) {
    var token, userId;
    userId = $state.params.userId;
    token = $state.params.token;

    if (password === confirmPassword) {
      return passwordServices.recoverPassword(userId, token, password).then(function(response) {
        console.log("Password recovery success");
        $scope.setAlertPwd(true, "Lösenordet har uppdaterats.");
        return routeService.toLogin();
      }, function(response) {
        console.log("Password recovery fail");
        $scope.response = response;
        if (response.data.response_code === "-23") {
          return $scope.setAlertPwd(false, "Länken är inte längre giltig!");
        } else {
          return $scope.setAlertPwd(false, "Lösenordet kunde inte uppdateras.");
        }
      });
    } else {
      return $scope.setAlertPwd(false, "Lösenorden matchar inte.");
    }
  };
  $scope.setAlertPwd = function(success, message) {
    $scope.alertPwd = {};
    if (success) {
      return $scope.alertPwd.success = message;
    } else {
      return $scope.alertPwd.failed = message;
    }
  };
  $scope.init = function() {
    console.log("init password recovery");
    console.log($state);

  };
 $scope.init();
});

//# sourceMappingURL=passwordRecoveryController.js.map
