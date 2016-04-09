'use strict';

'use strict';

angular.module('inspinia').factory('SignupService', function($http, Session) {
  var authService = {};
  
  authService.login = function (credentials) {
    return $http
      .post('/login', credentials)
      .then(function (res) {
        Session.create(res.data.id, res.data.user.id,
                       res.data.user.role);
        return res.data.user;
      });
  };
 
  authService.isAuthenticated = function () {
    return !!Session.userId;
  };
 
  authService.isAuthorized = function (authorizedRoles) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (authService.isAuthenticated() &&
      authorizedRoles.indexOf(Session.userRole) !== -1);
  };
 
  return authService;

});


/*
angular.module('inspinia').factory('singupService', ($http, $state) => {
  var users = {};

  users.getUserCredentials = () => {
    return $http.get('api/users.json').then((response) => {
        return response.data;
    });
  };

  users.getUserName = () => {
    return localStorage.getItem('isUser');
  };

  users.requestSingUp = (data) => {
  	   return $http.post('https://crm-multimedianordic.c9users.io:8081/signup').then((response) => {
       return response.data;
    });
  };

  users.signOut = () => {
    localStorage.removeItem('isUser');
    $state.go('login');
  };

  return users;
});

*/