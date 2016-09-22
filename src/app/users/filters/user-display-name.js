'use strict';

angular
  .module('inspinia')
  // Filter for displaying users 'Firstname Lastname' or initials, or 'username' if he didn't sepcify his name.
  .filter('crmUserDisplayName', function() {
    return function(user, initialsOnly) {
      var res = user.hasOwnProperty('username') ? user.username : '';

      if (user.hasOwnProperty('contactProfile')) {
        var pfile = user.contactProfile;

        if (pfile.hasOwnProperty('firstname') || pfile.hasOwnProperty('lastname'))
          res = initialsOnly ?  pfile.firstname[0] + pfile.lastname[0] : pfile.firstname + ' ' + pfile.lastname;
      }

      return res;
    };
  });
