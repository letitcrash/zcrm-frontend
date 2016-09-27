'use strict';

angular
  .module('inspinia')
  .factory('employeeModel', function () {
    function ContactProfile() {
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.address = '';
      this.city = '';
      this.zipCode = '';
      this.phoneNumberMobile = '';
    }

    function Employee() {
      this.username = '';
      this.baseUrl = '';
      this.employeeType = '';
      this.employeeLevel = null;
      this.employeeType = '';
      this.union = null;
      this.shift = null;
      this.department = null;
      this.position = null;
      this.flypass = '';

      this.contactProfile = new ContactProfile();
    }

    return {
      get: function() { return new Employee(); }
    }
  });
