'use strict';

angular
  .module('inspinia')
  .factory('userModel', function () {
    function ContactProfile() {
      this.firstname = '';
      this.lastname = '';
      this.email = '';
      this.address = '';
      this.city = '';
      this.zipCode = '';
      this.phoneNumberMobile = '';
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
