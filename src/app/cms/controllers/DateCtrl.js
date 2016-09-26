'use strict';

angular
  .module('inspinia')
  .controller('DateCtrl', function () {
    var vm = this;

    vm.today = function () {
      if (!vm.dateTime)
        vm.dateTime = new Date();

      return vm.dateTime;
    };

    vm.clear = function () {
      vm.dateTime = null;
    };

    vm.options = {
      dateDisabled: disabled,
      formatYear: 'yy',
      maxDate: new Date(2020, 5, 22),
      minDate: new Date(1969, 12, 31),
      startingDay: 1,
      showWeeks: false
    };

    // Disable weekend selection
    function disabled(data) {
      var MONDAY = 0;
      var SUNDAY = 6;

      var date = data.date;
      var mode = data.mode;
      return mode === 'day' && (date.getDay() === MONDAY || date.getDay() === SUNDAY);
    }

    vm.open1 = function () {
      vm.popup1.opened = true;
    };

    vm.open2 = function () {
      vm.popup2.opened = true;
    };

    vm.setDate = function (year, month, day) {
      vm.dateTime = new Date(year, month, day);
    };

    vm.formats = ['dd-MMMM-yyyy'];
    vm.format = vm.formats[0];
    vm.altInputFormats = ['M!/d!/yyyy'];

    vm.popup1 = {
      opened: false
    };

    vm.popup2 = {
      opened: false
    };

    vm.events = [{
      date: getTomorrow(),
      status: 'full'
    }];

    function getTomorrow() {
      var oneDay = 1;
      var tomorrow = new Date();
      return tomorrow.setDate(tomorrow.getDate() + oneDay);
    }

    function getAfterTomorow() {
      var oneDay = 1;
      var afterTomorrow = getTomorrow();

      return afterTomorrow.setDate(afterTomorrow.getDate() + oneDay);
    }
  });
