'use strict';
angular.module('inspinia').controller("MailboxCtrl", function($scope, $rootScope, $state, mailboxService, ticketService, dataService, employeeService) {
  var getMail,getOutbox,getEmployees, activeMailbox;




  getEmployees =  function(force, pageSize, pageNr, searchTerm) {
      employeeService.getList(true, pageSize, pageNr, searchTerm).then(function(response) {
                console.log("got employee list");
                console.log(response);
                $scope.employees = response;
              }, function(response) {
              console.log("Could not get employee");
               console.log(response);
            });


  };

  getMail = function(force, pageSize, pageNr, searchTerm) {

      mailboxService.get(dataService.getEmployments().id).then(function(response) {
        console.log(response);
        if(response.length > 0) {
          //dataService.setDefaultMailboxId(response);
            $rootScope.setMailboxList(response);
            activeMailbox = response[0];
              mailboxService.getInbox(force, pageSize, pageNr, searchTerm, response[2].id).then(function(response) {
                console.log("got mail");
                console.log(response);
                $scope.showLoadingMessage = false;
                $scope.mail = response;
                $scope.totalItems = response.totalSize;
              }, function(response) {
              console.log("Could not get mails");
               console.log(response);
            });
            
            ticketService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
                console.log("got tickets");
                console.log(response);
                $scope.showLoadingMessage = false;
                $scope.tickets = response;
                $scope.totalItems = response.totalSize;
              }, function(response) {
                console.log("Could not get employees");
                 console.log(response);
              });

          } else {
            console.log("You have no mailboxes");
          }
        }, function(response) {
            return console.log("Failed to get mailboxlist");
      });

    var mailbox = $rootScope.getMailboxList();
    console.log("mailbox");
    console.log(mailbox);


  };


  getOutbox = function(force, pageSize, pageNr, searchTerm) {
   mailboxService.getOutbox(force, pageSize, pageNr, searchTerm).then(function(response) {
      console.log("got mail");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.mail = response;
      $scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Could not get employees");
       console.log(response);
    });
  };

  $scope.showInbox = function() {
    $scope.activeMail = false;
    $scope.compose = false;

    getMail(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };

  $scope.showOutbox = function() {
    $scope.activeMail = false;
    $scope.compose = false;

    getOutbox(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
  };

  $scope.composeMail = function() {
    $scope.activeMail = false;
    $scope.compose = true;
  };


  $scope.selectMail = function(m) {

    if(m.selected) {
      $scope.selectedEmails.push(m);
    } else {
      $scope.selectedEmails.splice(m);
    } 

  };

  $scope.createTicket = function(tkt) {
    console.log($scope.selectedEmails)
  

    ticketService.post(tkt, $scope.selectedEmails).then(function(response) {
      console.log("tkt created");
      console.log(response);
     
    }, function(response) {
      console.log("tkt creation failed");
       console.log(response);
    });

    $scope.activeMail = false;
    $scope.compose = true;
  };


  $scope.sendMail = function(email, recp) {
    email.to = [];
    email.to.push(recp);
    console.log(email);

    mailboxService.post(email, activeMailbox.id).then(function(response) {
      console.log("sent mail");
      console.log(response);
     
    }, function(response) {
      console.log("Could not sent mail");
       console.log(response);
    });

    $scope.activeMail = false;
    $scope.compose = true;
  };

  $scope.showMail = function(mail) {
    $scope.activeMail = true;
    $scope.currentMail = mail;
  
  };
  $scope.init = function() {
    console.log("Running init in mailboxController");
    $scope.selectedEmails = [];
    $scope.activeMail = false;
    $scope.showLoadingMessage = true;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.newPeriods = [];
    getEmployees(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    getMail(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    $scope.isCollapsed = true;

  };
  
  $scope.init();


});

