'use strict';

angular
  .module('inspinia')
  // Filter for displaying users 'Firstname Lastname' or initials, or 'username' if he didn't sepcify his name.
  .filter('crmUserDisplayName', function() {
    return function(user, initialsOnly) {
      var res = '';

      if (angular.isObject(user)) {
        if (user.hasOwnProperty('username'))
          res = user.username;

        if (user.hasOwnProperty('contactProfile')) {
          var pfile = user.contactProfile;
          var parts = [];

          if (pfile.hasOwnProperty('firstname'))
            parts.push(initialsOnly ?  pfile.firstname[0] : pfile.firstname);

          if (pfile.hasOwnProperty('lastname'))
            parts.push(initialsOnly ?  pfile.lastname[0] : pfile.lastname);

          res = parts.join(' ');
        }
      }

      return res;
    };
  });
