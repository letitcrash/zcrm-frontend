'use strict';
angular.module('inspinia').controller("CompanyCtrl", function($scope, $rootScope, companyService, generalUtils, dataService) {
  var del;
  $scope.cancel = function() {
    $scope.companies = generalUtils.withoutUndefined($scope.companies);
    if (($scope.editId != null)) {
      $scope.selected = angular.copy(_.find($scope.companies, (function(c) {
        return c.id === $scope.editId;
      })));
      return $scope.editId = void 0;
    }
  };
  $scope.getCompanyList = function(force, pageSize, pageNr, searchTerm) {
    return companyService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      $scope.companies = response;
      console.log($scope.companies)
      return $scope.totalItems = response.totalSize;
    }, function(response) {
      return console.log("Failed to get companies");
    });
  };
  $scope.add = function() {
    var cp;
    console.log('hey');
    $scope.companies = generalUtils.withoutUndefined($scope.companies);
    cp = {};
    return $scope.companies.unshift(cp);
  };
  $scope.save = function(cp) {
    if ((cp.id != null)) {
      return $scope.update(cp);
    } else {
      return console.log("Create not yet implemented");
    }
  };
  $scope.update = function(cp) {
    return companyService.update(cp).then(function(response) {
      $scope.cancel();
      $scope.setSelected(response);
      return $scope.setAlertCp(true, "Företaget har uppdaterats");
    }, function(response) {
      console.log("Update company failed");
      return $scope.setAlertCp(false, "Företaget kunde inte uppdateras");
    });
  };
  $scope.setCurrentCompany = function(company) {
    dataService.setCurrentCompany(company);
    $rootScope.setCompanyStr(company.name);
    return $scope.currentCompanyId = company.id;
  };
  $scope.edit = function(cp) {
    $scope.cancel();
    return $scope.editId = cp.id;
  };
  $scope.setSelected = function(cp) {
    $scope.cancel();
    return $scope.selected = angular.copy(cp);
  };
  $scope.toggleSelected = function(cp) {
    if (!$scope.selected || $scope.selected.id !== cp.id) {
      return $scope.setSelected(cp);
    } else {
      return $scope.setSelected(void 0);
    }
  };
  $scope.setAlertCp = function(success, message) {
    $scope.alertCp = {};
    if (success) {
      return $scope.alertCp.success = message;
    } else {
      return $scope.alertCp.failed = message;
    }
  };
  $scope.searchCompanies = function() {
    var DELAY_AMOUNT, DELAY_KEY;
    $scope.pageNr = 1;
    DELAY_AMOUNT = 500;
    DELAY_KEY = "searchCompaniesDelay";
    return generalUtils.delayFunction(DELAY_KEY, DELAY_AMOUNT).then(function() {
      return $scope.getCompanyList(true, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    });
  };
  $scope.openConfirmDelete = function(cp) {
    var ModalInstanceCtrl, modalInstance;
    ModalInstanceCtrl = function($scope, $modalInstance) {
      $scope.title = "Varning!";
      $scope.text = "Vill du verkligen ta bort företaget '" + generalUtils.formatUser(cp.name) + "'";
      $scope.del = function() {
        return $modalInstance.close(1);
      };
      return $scope.cancel = function() {
        return $modalInstance.dismiss('cancel');
      };
    };
    modalInstance = $modal.open({
      templateUrl: 'components/partials/confirm-delete-dialog.html',
      controller: ModalInstanceCtrl,
      size: 'sm'
    });
    return modalInstance.result.then(function(res) {
      return del(cp.id);
    }, function() {
      return console.log('Modal dismissed at: ' + new Date());
    });
  };
  del = function(id) {
    return companyService["delete"](id).then(function(response) {
      console.log("company has been deleted");
      return $scope.getCompanyList(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    }, function(response) {
      return console.log("could not delete company");
    });
  };
  $scope.changePage = function() {
    return $scope.getCompanyList(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };

  $scope.openCp = function(cp) {
    console.log(cp)
    return companyService.get(cp.id).then(function(response) {
      $scope.curentCp = response;
      $scope.activeEmp = true;
      var positions = ["Driller","Electrican"];
      $scope.curentCp.positions = positions;
    }, function(response) {
      return console.log("Failed to get companany");
    });

  };


  $scope.removePosition = function(p) {
    $scope.activeEmp = false;
    $scope.curentCp = undefined;
  }

  $scope.addPosition = function(p) {
    $scope.curentCp.positions.push(p);
    $scope.position = undefined;
  }

  $scope.showCompanies = function() {
    $scope.activeEmp = false;
    $scope.curentCp = undefined;
  }

  $scope.init = function() {
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.getCompanyList(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    return $scope.currentCompanyId = dataService.getCurrentCompanyId();
  };
  return $scope.init();
});

//# sourceMappingURL=companiesController.js.map
