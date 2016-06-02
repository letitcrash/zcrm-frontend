'use strict';
angular.module('inspinia').controller("TicketsCtrl", function($scope, $rootScope, $location, $state,$window, ticketService) {
    var getTickets;
    
    //inserted
    $scope.selected = 1;
    $scope.issues = [
        {issueName: "ISSUE-1", issueCreatedBy: "Monica", issueDate: "May 13, 2016"},
        {issueName: "ISSUE-2", issueCreatedBy: "Jake", issueDate: "May 13, 2016" },
        {issueName: "ISSUE-3", issueCreatedBy: "Flygon", issueDate: "May 13, 2016" }
    ];
    $scope.itable = [
                    {update:'new', priority: 'high', number: 'Issue-1', client: 'Client-1', team: 'Team1', person: 'person1@gmail.com', created: '13.05.2016', deadline: 'Today'},
                    {update:'overdue', priority: 'mid', number: 'Issue-2', client: 'Client-2', team: 'Team2', person: 'person2@gmail.com', created: '13.05.2016', deadline: 'Today'},
                    {update:'closed', priority: 'low', number: 'Issue-3', client: 'Client-3', team: 'Team3', person: 'person3@gmail.com', created: '13.05.2016', deadline: 'Today'}, 
                    {update:'new', priority: 'high', number: 'Issue-1', client: 'Client-1', team: 'Team1', person: 'person1@gmail.com', created: '13.05.2016', deadline: 'Today'},
                    {update:'overdue', priority: 'mid', number: 'Issue-2', client: 'Client-2', team: 'Team2', person: 'person2@gmail.com', created: '13.05.2016', deadline: 'Today'},
                    {update:'closed', priority: 'low', number: 'Issue-3', client: 'Client-3', team: 'Team3', person: 'person3@gmail.com', created: '13.05.2016', deadline: 'Today'},
                    {update:'new', priority: 'high', number: 'Issue-1', client: 'Client-1', team: 'Team1', person: 'person1@gmail.com', created: '13.05.2016', deadline: 'Today'},
                    {update:'overdue', priority: 'mid', number: 'Issue-2', client: 'Client-2', team: 'Team2', person: 'person2@gmail.com', created: '13.05.2016', deadline: 'Today'},
                    {update:'closed', priority: 'low', number: 'Issue-3', client: 'Client-3', team: 'Team3', person: 'person3@gmail.com', created: '13.05.2016', deadline: 'Today'},
                     {update:'new', priority: 'high', number: 'Issue-1', client: 'Client-1', team: 'Team1', person: 'person1@gmail.com', created: '13.05.2016', deadline: 'Today'},
                    {update:'overdue', priority: 'mid', number: 'Issue-2', client: 'Client-2', team: 'Team2', person: 'person2@gmail.com', created: '13.05.2016', deadline: 'Today'},
                    {update:'closed', priority: 'low', number: 'Issue-3', client: 'Client-3', team: 'Team3', person: 'person3@gmail.com', created: '13.05.2016', deadline: 'Today'}
                ];
    //inserted
    
  getTickets = function(force, pageSize, pageNr, searchTerm) {
   ticketService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      console.log("got tickets");
      console.log(response);
      $scope.showLoadingMessage = false;
      //$scope.tickets = response;
      $scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Could not get employees");
       console.log(response);
    });
  };
    

  $scope.openTicket = function (tkt) {
    $scope.activeTicket = tkt;
    $scope.showStuff = true;
    //$window.location.href = '/#/index/tickets/' + tkt.id;

  };

  $scope.create = function(tkt) {
    ticketsService.create(tkt).then(function(response) {
      console.log("Tkt created succesfully");
      console.log(response);
     
      $scope.tickets.push(response);
      $scope.setSelected(response.id);
      return setEmpChange(true, "Medarbetaren har skapats.");
    }, function(response) {
      console.log("Employee could not be created");
      $scope.useralert = "Employee could not be created";
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

  };
  
  $scope.init();


});
