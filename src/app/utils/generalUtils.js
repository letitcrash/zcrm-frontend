'use strict';
angular.module('inspinia').factory('generalUtils', function($rootScope, $timeout, $filter, $q) {
  var delayedFunctions;
  delayedFunctions = {};
  return {

    /* TODO needed?
    delayFunction: (f, delay, timestamp) ->
      delayedFunctions[timestamp] = new Date().getTime()
      currentTime = delayedFunctions[timestamp]
      $timeout( (() ->  f() if(currentTime == delayedFunctions[timestamp]) ), delay )
     */

    /*
    This function returns a promise which will resolve after a delayed time
    If another function call with the same STAMP_IDENTIFIER is made after the first one
    then the first one will be rejected
    This function is used in search boxes
     */
    delayFunction: function(STAMP_IDENTIFIER, DELAY_TIME) {
      var currentTime, deferred;
      deferred = $q.defer();
      delayedFunctions[STAMP_IDENTIFIER] = new Date().getTime();
      currentTime = delayedFunctions[STAMP_IDENTIFIER];
      $timeout((function() {
        if (currentTime === delayedFunctions[STAMP_IDENTIFIER]) {
          return deferred.resolve();
        } else {
          return deferred.reject();
        }
      }), DELAY_TIME);
      return deferred.promise;
    },

    /*
    This function assumes that if id is not set on the original, then we can simply remove the original form the list
     Else we need to replace the modified object in the list with the copy of the original
     @l list
     @original copy of the original value
     @returns {*} returns the list
     */
    cancelListEdit: function(l, original) {
      var i, j, ref;
      if (original) {
        if (!original.id) {
          return _.without(l, _.findWhere(l, {
            id: void 0
          }));
        } else {
          for (i = j = 0, ref = l.length - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
            if (l[i].id === original.id) {
              l[i] = original;
            }
          }
        }
      }
      return l;
    },
    withoutUndefined: function(l) {
      return _.without(l, _.findWhere(l, {
        id: void 0
      }));
    },
    calcPeriodDuration: function(period) {
      if ((period != null) && (period.blips != null)) {
        period.blips = _.sortBy(period.blips, function(blip) {
          return blip.timestamp;
        });
        return this.calcBlips(period.blips, 0, 0, 0);
      } else {
        return 0;
      }
    },
    calcBlips: function(blips, i, timestamp, total) {
      var cBlip;
      if (i < blips.length) {
        cBlip = blips[i];
        if (timestamp === 0 && (cBlip.typeOf === 1 || cBlip.typeOf === 3)) {
          timestamp = cBlip.timestamp;
        } else if (timestamp > 0 && (cBlip.typeOf === 2 || cBlip.typeOf === 4)) {
          total = total + (cBlip.timestamp - timestamp);
          timestamp = 0;
        }
        return this.calcBlips(blips, i + 1, timestamp, total);
      } else {
        if (timestamp > 0) {
          total = total + (this.getNowInMs() - timestamp);
        }
        return total;
      }
    },
    getNowInMs: function() {
      return new Date().getTime();
    },
    formatUser: function(user) {
      var str = '';
      if (user.contactProfile.firstname) {
        str +=  user.contactProfile.firstname + " ";
      }

      if (user.contactProfile.lastname) {
        str += user.contactProfile.lastname;
      }

      return str;
    },
    formatCompany: function(cp) {
      if ((cp != null)) {
        return cp.name;
      }
    },
    formatWorkplace: function(wp) {
      if ((wp != null)) {
        return wp.name + ", " + wp.skv;
      }
    },
    formatTimestamp: function(timestamp) {
      var date;
      if ((timestamp != null)) {
        date = new Date(timestamp);
        return $filter('date')(date, 'yyyy-MM-dd HH:mm');
      }
    },
    formatMarkerTimestamp: function(timestamp) {
      var date;
      if ((timestamp != null)) {
        date = new Date(timestamp);
        return $filter('date')(date, 'dd/MM HH:mm');
      }
    },
    formatTimestampToTime: function(timestamp) {
      var date;
      if ((timestamp != null)) {
        date = new Date(timestamp);
        return $filter('date')(date, 'HH:mm');
      }
    },
    formatTimestampToDate: function(timestamp) {
      if (timestamp) {
        var date = new Date(timestamp);
        return $filter('date')(date, 'yyyy-MM-dd');
      }
    },
    formatMs: function(ms) {
      var hours, minutes, seconds, str;
      seconds = this.formatMsToSeconds(ms);
      minutes = this.formatMsToMinutes(ms);
      hours = this.formatMsToHours(ms);
      str = '';
      if (hours > 0) {
        str = str + hours + " tim ";
      }
      if (minutes > 0) {
        str = str + minutes + " min";
      }
      if (hours <= 0 && minutes <= 0 && seconds > 0) {
        str = "<1 min";
      } else if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        str = "0 tim";
      }
      return str;
    },
    formatMsToSeconds: function(ms) {
      return Math.floor((ms / 1000) % 60);
    },
    formatMsToMinutes: function(ms) {
      return Math.floor((ms / 1000 / 60) % 60);
    },
    formatMsToHours: function(ms) {
      return Math.floor(ms / 1000 / 60 / 60);
    }
  };
});

//# sourceMappingURL=generalUtils.js.map
