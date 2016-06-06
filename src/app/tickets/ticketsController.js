'use strict';
angular.module('inspinia').controller("TicketsCtrl", function($scope, $rootScope, $location, $state,$window, ticketService) {
    var getTickets;
    
    //inserted
    $scope.selected = 1;

    $scope.itable = [
                    {update:'new', priority: 'high', number: 'Issue-1', client: 'Client-1', team: 'Team-1', person: 'person1@gmail.com', created: '1288323623006', deadline: '1288323623006', description: 'Capicola bresaola shank beef ribs. Pancetta boudin jowl, sausage beef ball tip turducken pork salami t-bone brisket kielbasa kevin ham venison. Landjaeger turducken shankle, jerky biltong hamburger leberkas meatloaf pork boudin swine bacon tri-tip shank andouille. Doner corned beef frankfurter capicola biltong tri-tip ball tip porchetta drumstick chicken meatball jowl t-bone. Leberkas pork chop chuck, shankle bresaola pork loin porchetta meatloaf corned beef tongue.'},
                    {update:'overdue', priority: 'mid', number: 'Issue-2', client: 'Client-2', team: 'Team-2', person: 'person2@gmail.com', created: '1288323623006', deadline: '1288323623006'},
                    {update:'closed', priority: 'low', number: 'Issue-3', client: 'Client-3', team: 'Team-3', person: 'person3@gmail.com', created: '1288323623006', deadline: '1288323623006'}, 
                    {update:'new', priority: 'high', number: 'Issue-1', client: 'Client-1', team: 'Team-1', person: 'person1@gmail.com', created: '1288323623006', deadline: '1288323623006'},
                    {update:'overdue', priority: 'mid', number: 'Issue-2', client: 'Client-2', team: 'Team-2', person: 'person2@gmail.com', created: '1288323623006', deadline: '1288323623006'},
                    {update:'closed', priority: 'low', number: 'Issue-3', client: 'Client-3', team: 'Team-3', person: 'person3@gmail.com', created: '1288323623006', deadline: '1288323623006'},
                    {update:'new', priority: 'high', number: 'Issue-1', client: 'Client-1', team: 'Team-1', person: 'person1@gmail.com', created: '1288323623006', deadline: '1288323623006'},
                    {update:'overdue', priority: 'mid', number: 'Issue-2', client: 'Client-2', team: 'Team-2', person: 'person2@gmail.com', created: '1288323623006', deadline: '1288323623006'},
                    {update:'closed', priority: 'low', number: 'Issue-3', client: 'Client-3', team: 'Team-3', person: 'person3@gmail.com', created: '1288323623006', deadline: '1288323623006'},
                     {update:'new', priority: 'high', number: 'Issue-1', client: 'Client-1', team: 'Team-1', person: 'person1@gmail.com', created: '1288323623006', deadline: '1288323623006'},
                    {update:'overdue', priority: 'mid', number: 'Issue-2', client: 'Client-2', team: 'Team-2', person: 'person2@gmail.com', created: '1288323623006', deadline: '1288323623006'},
                    {update:'closed', priority: 'low', number: 'Issue-3', client: 'Client-3', team: 'Team-3', person: 'person3@gmail.com', created: '1288323623006', deadline: '1288323623006'}
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
      console.log("Ticket could not be created");
      $scope.useralert = "Ticket could not be created";
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
