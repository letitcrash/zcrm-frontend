'use strict';
angular.module('inspinia').controller("TicketsCtrl", function($scope, $rootScope, $location, $state,$window, ticketService, employeeService, dataService) {
    var getTickets;
    
    //inserted
    $scope.selected = 1;
    //inserted
    
  getTickets = function(force, pageSize, pageNr, searchTerm) {
   ticketService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      console.log("got tickets");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.tickets = response.data;
      $scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Could not get tickets");
      $scope.page.error = "Could not get tickets";
      console.log(response);
    });
  };
  
  $scope.getEmloyees = function(searchTerm) {
    return employeeService.getTypeaheadList(searchTerm).then(function(response) {
      return response.map(function(item) {
        item.fullname = item.user.contactProfile.firstname + " " +item.user.contactProfile.lastname;
        return item;
      });
      }, function(response) {
      console.log("Could not get employees");
      console.log(response);
      return [];
    });
  };
    
  $scope.empSelected = function(item, model, label, event) {
    console.log(item);
    $scope.currentTicket.members.push(item.user);
    $scope.temp.assignedCurrentUser = undefined;

  }
  $scope.addMyselfToAssigned = function() {

    $scope.currentTicket.members.push(dataService.getUser());

  };

  $scope.deleteUserFromFilter = function (emp) {
    var index = $scope.currentTicket.members.indexOf(emp);
    if (index > -1) {
      $scope.currentTicket.members.splice(index, 1);
    }
  };


  $scope.openTicket = function (tkt) {
    $scope.mode = 1;
    ticketService.get(tkt.id).then(function(response) {
      console.log("got ticket");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.currentTicket = response;
    }, function(response) {
      console.log("Could not get tickets");
      $scope.page.error = "Could not get tickets";
      console.log(response);
    });
    //$window.location.href = '/#/index/tickets/' + tkt.id;
  };

  $scope.defaultMode = function () {
    $scope.mode = 0;
  };

  $scope.expandMode = function () {
    $scope.mode = 2;
  };

  $scope.compressMode = function () {
    $scope.mode = 1;
  };

  $scope.saveMembers = function (ticket) {
    ticketService.addMembersToTicket(ticket).then(function(response) {
      console.log("Tkt members list succesfully");
      console.log(response);    
      ticket.members = response;
      $scope.page.editParticipants = false;
    }, function(response) {
      console.log("Ticket emp list could not be updated");
    //  $scope.page.error = "Ticket could not be created";
    });
  }

  $scope.createTicketAction = function () {
    $scope.compressMode();
    $scope.currentTicket = {};
    $scope.currentTicket.members = [];
    $scope.currentTicket.id = null;
    
    $scope.currentTicket.status = {
      availableOptions: [
        {id: '1', name: 'New'},
        {id: '2', name: 'Open'},
        {id: '3', name: 'Posponed'},
        {id: '4', name: 'Resolved'}
      ],
        selectedOption: {id: '1', name: 'New'}
    };

    $scope.currentTicket.priority = {
      availableOptions: [
        {id: '0', name: 'Low'},
        {id: '1', name: 'Mid'},
        {id: '2', name: 'High'},
      ],
        selectedOption: {id: '1', name: 'Mid'}
      };

  };

  $scope.create = function(tkt) {
    $scope.page.error = undefined;
    ticketService.create(tkt).then(function(response) {
      console.log("Tkt created succesfully");
      console.log(response);     
      $scope.tickets.push(response);
      $scope.page.notification = "Ticket created succesfully";
    }, function(response) {
      console.log("Ticket could not be created");
      $scope.page.error = "Ticket could not be created";
    });
  };

  $scope.init = function() {
    console.log("Running init in ticket Controller");
    //$scope.activeMail = false;
    $scope.showLoadingMessage = true;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.newPeriods = [];
    getTickets(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    $scope.isCollapsed = true;
    $scope.showTicket = false;
    $scope.page = {};
    $scope.currentTicket = {};
    $scope.currentTicket.members = [];
    $scope.isCollapsed = false;
    $scope.temp = {};


  };
  
  $scope.init();


});
