'use strict';

angular
  .module('inspinia')
  .factory('EmployeeModel', function () {
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

      this.contactProfile = new ContactProfile();
    }

    return Employee;
  });
