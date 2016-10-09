'use strict';

angular
  .module('inspinia')
  .factory('employeeModel', function (userModel) {
    // TODO: Delete after backend refactoring
    function EmpAdditionalInfo() {
      this.emplId = 0;
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
      this.land = true;
      this.seniorityDate = null;
      this.socialSecNumber = null;
      this.jacketSize = '';
      this.indivPaid = false;
      this.airport = '';
    }

    function Employee() {
      // TODO: Delete after backend refactor
      this.baseUrl = 'baseUrl';
      this.username = '';
      this.union = null;
      this.shift = null;
      this.department = null;
      this.position = null;
      this.flypass = '';

      this.user = userModel.get();
      this.additionalInfo = new EmpAdditionalInfo();
    }

    return {
      get: function() { return new Employee(); }
    }
  });
