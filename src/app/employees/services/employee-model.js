'use strict';

angular
  .module('inspinia')
  .factory('employeeModel', function (userModel) {
    // TODO: Delete after backend refactoring
    function EmpAdditionalInfo() {
      // TODO: Delete after backend refactor
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
      // TODO: Delete after backend refactor
      this.username = '';
      this.union = null;
      this.shift = null;
      this.department = null;
      this.position = null;
      this.flypass = '';

      this.user = userModel.get();
      this.additionalInfo = new EmpAdditionalInfo();
    }

    function validateInt(val) {
      var num = parseInt(val);

      return angular.isNumber(num) ? num : null;
    }

    function validateBool(val) { return val === 'true' ? true : false; }

    return {
      get: function() { return new Employee(); },
      // TODO: Delete it
      validate: function(model) {
        if (model instanceof Employee) {
          model.additionalInfo.membershipNum = validateInt(model.additionalInfo.membershipNum);
          model.additionalInfo.socialSecNumber = validateInt(model.additionalInfo.socialSecNumber);
          model.additionalInfo.emplNumber = validateInt(model.additionalInfo.emplNumber);
          model.additionalInfo.indivPaid = validateBool(model.additionalInfo.indivPaid);
          model.additionalInfo.land = validateBool(model.additionalInfo.land);
        }
      }
    }
  });
