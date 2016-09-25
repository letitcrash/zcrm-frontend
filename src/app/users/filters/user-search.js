'use strict';

angular
  .module('inspinia')
  // Filter for searching users by firstname, lastname and username
  .filter('crmUserSearch', function() {
    return function(users, search) {
      var res = [];

      if (angular.isArray(users) && users.length > 0) {
        res = users.filter(function(user) {
          var matched = false;
          var pfile = user.contactProfile;

          if (pfile.hasOwnProperty('firstname') && pfile.firstname.toLowerCase().indexOf(search) !== -1)
            matched = true;

          if (pfile.hasOwnProperty('lastname') && pfile.lastname.toLowerCase().indexOf(search) !== -1)
            matched = true;

          if (user.hasOwnProperty('username') && user.username.toLowerCase().indexOf(search) !== -1)
            matched = true;

          return matched
        });
      }

      return res;
    };
  });
