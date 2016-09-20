'use strict';
angular.module('inspinia').controller("LoginCtrl", function($scope, $rootScope, $state, $log, signupServices, routeService, requestService, dataService, passwordServices, companyService, mailboxService) {
  $scope.login = function(username, password) {
    var args;
    $scope.loginFailed = false;
    args = {};
    args.username = username;
    args.password = password;
    $scope.alertPassword = {};
    requestService.ttPost('login', args).then(function(response) {
       $scope.successfulLogin(response);
    }, function(response) {
       $scope.failedLogin(response);
    });
  };
  $scope.successfulLogin = function(response) {
    if ((response != null) && (response.employee != null)) {
      $scope.alertPassword = {};
      dataService.clearData();
      dataService.setUser(response.user);
      dataService.setEmployments(response.employee);
      dataService.setSessionToken(response.sessionToken);
      
      companyService.get(dataService.getCurrentCompanyId()).then(function(response) {
        dataService.setCurrentCompany(response);
        $rootScope.setCompanyStr(response.name);
        //$rootScope.setCompany(response);
        //console.log(response)
      }, function(response) {
        return console.log("Failed to get company");
      });

      $rootScope.setUser(response.user);
      $state.transitionTo("index.tickets.list");
    } else {
      $scope.alertPassword = {};
      return $scope.alertPassword.failed = "Ett fel har inträffat, vänligen kontakta administration.";
    }
  };
  $scope.registerUser = function(email) {
    var baseUrl, i, j, maxVal, ref;
    $scope.invalidEmail = false;
    maxVal = email.length;
    console.log(window.location.origin);
    for (i = j = 0, ref = maxVal; j <= ref; i = j += 1) {
      if (email[i] === '?' || email[i] === '=' || email[i] === '&') {
        $scope.invalidEmail = true;
        console.log("invalidEmail: " + $scope.invalidEmail);
        return;
      }
    }
    $scope.emailHasBeenSent = true;
    baseUrl = window.location.origin;
    console.log(baseUrl);
    return signupServices.sendSignupEmail(email, baseUrl).then(function(response) {
      return console.log("Success");
      $scope.applied = true;

    }, function(response) {
      return console.log("Failure");
    });
  };

  $scope.apply = function(email) {
    $log.log("start loading");
    // start loading
    $scope.loginLoading = true;

    var args = {
        email: email,
        url: 'http://http://desk-it.com//#/singup',
      };

    requestService.ttPost('signup', args).then(function(response) {
        $log.log(response);
        $scope.loginLoading = false;
        $scope.applied = true;
    }, function(response) {
        $log.log(response);
    });

  }

  $scope.failedLogin = function(response) {
    console.log("failed login");
    $scope.alertPassword = {};
    $scope.alertPassword.failed = "Inloggning misslyckades, vänligen försök igen";
    return $scope.loginFailed = true;
  };
  return $scope.forgotPassword = function(username) {
    return passwordServices.forgotPassword(username).then(function(response) {
      $scope.alertUsername = {};
      return $scope.alertUsername.success = "Ett nytt lösenord har skickats till din e-mailadress";
    }, function(response) {
      console.log("forgot password fail");
      $scope.alertUsername = {};
      return $scope.alertUsername.failed = "Kunde inte skicka ett nytt lösenord";
    });
  };
});

//# sourceMappingURL=loginController.js.map
