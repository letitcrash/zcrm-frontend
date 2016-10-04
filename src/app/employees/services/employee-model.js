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

    // TODO: Delete after backend refactoring
    function EmpAdditionalInfo() {
      this.membershipNum = null;
      this.enrolledDept = null;
      this.enrolledIE = null;
      this.enrolledLO = null;
      this.refBy = '';
      this.resignedDate = null;
      this.shopStewardCourses = null;
      this.agreement = '';
      this.voCourses = null;
      this.emplNumber = null;
      this.status = '';
      this.workplace = '';
      this.comment = '';
      this.land = false;
      this.seniorityDate = null;
      this.socialSecNumber = null;
      this.jacketSize = '';
      this.indivPaid = false;
      this.airport = '';
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
      this.additionalInfo = new EmpAdditionalInfo();
    }

    return {
      get: function() { return new Employee(); }
    }
  });
