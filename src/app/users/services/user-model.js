'use strict';

angular
  .module('inspinia')
  .factory('userModel', function () {
    function ContactProfile() {
      this.firstname = '';
      this.lastname = '';
      this.birthdate = null;
      this.email = '';
      this.emailHome = '';
      this.emailWork = '';
      this.address = '';
      this.secondAddress = '';
      this.city = '';
      this.zipCode = '';
      this.phoneNumberMobile = '';
      this.phoneNumberHome = '';
      this.phoneNumberWork = '';
    }

    function User() {
      this.username = '';
      this.userLevel = null;
      this.contactProfile = new ContactProfile();
    }

    return {
      get: function() { return new User(); }
    }
  });
