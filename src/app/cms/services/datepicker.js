'use strict';

angular
  .module("inspinia")
  .factory("datepicker", function () {
    return function () {
      var yearsToAdd = 2,
        yearsToSub = 1,
        publicationTime;

      var now = new Date();

      var self = this;

      function getMaxDate() {
        return (new Date()).setFullYear(now.getFullYear() + yearsToAdd)
      }

      function getMinDate() {
        return (new Date()).setFullYear(now.getFullYear() + yearsToSub)
      }

      self.datepicker = {
        options: Object.freeze({
          formatYear: 'yy',
          maxDate: getMaxDate(),
          minDate: getMinDate(),
          startingDay: 1,
          showWeeks: false
        }),
        input: ''
      }
    }
  });
