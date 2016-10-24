'use strict';

angular
  .module("inspinia")
  .factory("datepicker", function () {
    return function () {
      var yearsToAdd = 2,
        yearsToSub = 1;

      var fullYear = new Date().getFullYear();

      var self = this;

      function getMaxDate() {
        return (new Date()).setFullYear(fullYear + yearsToAdd)
      }

      function getMinDate() {
        return (new Date()).setFullYear(fullYear + yearsToSub)
      }

      self.datepicker = {
        options: Object.freeze({
          formatYear: 'yy',
          maxDate: getMaxDate(),
          minDate: getMinDate(),
          startingDay: 1,
          showWeeks: false
        }),
        get inputDate() {
          if(!this.input)
            return new Date();

          return new Date(this.input);
        },
        input: ''
      }
    }
  });
