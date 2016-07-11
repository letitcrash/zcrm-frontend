'use strict';
angular
  .module('inspinia')
  // TODO: Maybe we must create another module for general filters like this two bellow.
  // Extract text from DOM elems.
  .filter('textFromHTML', function($sanitize) {
    return function(html) { return $($sanitize(html))[0].textContent; }
  })
  // Cut long text until specified length value and optional insert secified text at the end of cutted text.
  .filter('cutLongText', function() {
    return function(text, length, endText) {
      if (String(text).length > length) {
        return text.slice(0, text.lastIndexOf(' ', length)) + (endText ?
          endText : '');
      }

      return text;
    }
  })
  .controller("MailboxCtrl", function($scope, $http, $rootScope, $state, $stateParams, $sanitize, mailboxService,
        ticketService, dataService, employeeService, textFromHTMLFilter) {
    var getMail,getOutbox,getEmployees, activeMailbox;

    // Get current mailbox for current user
    $scope.mailboxId = $stateParams.hasOwnProperty('mailboxId') ?
      $stateParams.mailboxId : 1;
    // Inbox
    $scope.inbox = [];
    // Active conversation
    $scope.activeConv = null;

    // Sorting inbox: conversations with last recived mails will go on top
    function sortInbox(c1, c2) {
      var date1 = c1.mails[c1.mails.length - 1].received;
      var date2 = c2.mails[c2.mails.length - 1].received;

      if (date1 < date2) {
        return 1;
      } else if (date1 > date2) {
        return -1;
      }

      return 0;
    }

    // Get inbox mails
    function getInbox() {
      mailboxService.getInbox($scope.mailboxId).then(function(res) {
        if (res.length > 0) {
          console.log(res);
          $scope.inbox = res.sort(sortInbox);

          $scope.inbox.forEach(function(conv) {
            conv.mails.forEach(function(mail) {
              mail.preview = textFromHTMLFilter(mail.body);
              mail.active = false;
              mail.replyForm = false;
            });
          });
        }
      }, function(res) { console.log('Mailbox error'); });
    }

    // Select active conversation for detailed view
    $scope.selectConv = function(conv) {
      $scope.inbox.forEach(function(elem) {
        if (elem.hasOwnProperty('active') && elem.active) { elem.active = false; }
      });
      conv.active = true;
      conv.mails[0].active = true;
      $scope.activeConv = conv;
    };

    // Toggle mail reply form
    $scope.toggleReplyForm = function(mail) {
      mail.replyForm = !mail.replyForm;

      if (!mail.active) { mail.active = true; }
    };

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
          mailboxService.getInbox(force, pageSize, pageNr, searchTerm, response[0].id).then(function(response) {
            console.log("got mail");
            console.log(response);
            $scope.showLoadingMessage = false;
            $scope.mail = response;
            $scope.currentMail = $scope.mail[0];

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

    $scope.createNewTicket = function() {
      $scope.newTicket = true;
    };

    $scope.discardNewTicket = function() {
      $scope.newTicket = false;
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
      // getEmployees(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
      // getMail(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
      $scope.isCollapsed = true;
      // Get incoming mails
      getInbox();
    };

    $scope.init();

    angular.module('ui.bootstrap').controller('Collapse', function ($scope) {
      $scope.isCollapsed = false;
    });
  });
