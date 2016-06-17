

'use strict';
angular.module('inspinia').controller("ClientsCtrl", function($scope, $http,
 requestService, clientService, companyService, generalUtils, dataService, $q, $timeout, $uibModal) {
  var getClients, setClientChange;

  getClients = function(force, pageSize, pageNr, searchTerm, filter) {
    clientService.getList(force, pageSize, pageNr, searchTerm, filter).then(function(response) {
      console.log("got clients");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.clients = response;
      $scope.totalItems = response.totalCount;
      $scope.page.loaded = true;
    }, function(response) {
      console.log("Could not get clients");
      getClients(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm, $scope.filter);

    });
  };
 
  $scope.create = function(client) {
    clientService.create(client).then(function(response) {
      console.log("Employee created succesfully");
      console.log(response);
      $scope.page.mode = 0;
      $scope.clients.push(response);
      $scope.userFormStep = undefined;
    }, function(response) {
      console.log("Client could not be created");
      $scope.useralert = "Client could not be created";
    });
  };

  $scope.update = function(client) {
    console.log(client);
    clientService.update(client).then(function(response) {
      console.log("Client updated succesfully");
      console.log("response");
      $scope.currentClient = response.data;

      console.log(currentClient);
      $scope.page.editNameAction = false;
      $scope.page.editPhoneAction = false;
      $scope.page.editEmailAction = false;
      $scope.page.editAddressAction = false;

    }, function(response) {
      console.log("Client could not be updated");
      setClientChange(false, "Medarbetaren kunde inte ändras.");
    });
  };

  $scope.delete = function() {
    angular.forEach($scope.clients, function(client){
      if(client.selected){
        var index = $scope.clients.indexOf(client);
        console.log(client);
        if (index >= 0) {
          clientService.delete(client).then(function(response) {
            console.log("deleted");
            $scope.clients.splice(index, 1);
          }, function(response) {
          console.log("not deleted");
            setClientChange(false, "Medarbetaren kunde inte tas bort.");
          });
        }
      }
    });
  };

  $scope.save = function(client) {
    console.log(client)
    if ((client.id != null)) {
      $scope.update(client);
    } else {
      $scope.create(client);
    }
  };


  $scope.openClient = function(client) {
      $scope.page.mode = 1;
      $scope.currentClient = client;
      console.log($scope.currentClient);
  };

  $scope.defaultMode = function () {
    $scope.page.mode = 0;
  };

  $scope.compressMode = function () {
    $scope.page.mode = 1;
  };

  $scope.expandMode = function () {
    $scope.page.mode = 2;
  };
  $scope.createClientAction = function () {
    $scope.page.mode = 1;
    $scope.currentClient = {};
    $scope.currentClient.id = null;
    $scope.userFormStep = 1;
  };

  setClientChange = function(success, message) {
    $scope.clientChange = {};
    if (success) {
      $scope.clientChange.success = message;
    } else {
      $scope.clientChange.failed = message;
    }
  };
  
  $scope.init = function() {
    console.log("Running init in clientsController");
    $scope.page = {};
    $scope.page.mode = 0;
    $scope.page.loaded = false;

    $scope.currentClient = {};

    $scope.isCollapsed = false;
    $scope.showLoadingMessage = true;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";

    getClients(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };
  $scope.init();
});

//# sourceMappingURL=employeesController.js.map
