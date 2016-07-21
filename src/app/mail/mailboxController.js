'use strict';

angular
  .module('inspinia')
  // TODO: Maybe we must create another module for general filters like this two bellow.
  // Extract text from DOM elems.
  .filter('textFromHTML', function($sanitize) {
    return function(html) { return angular.element($sanitize(html))[0].textContent; }
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
  .controller("MailboxController", function($log, $rootScope, $state, $stateParams, $sanitize, mailboxService,
        ticketService, dataService, employeeService, textFromHTMLFilter) {
    var vm = this;

    // Get current mailbox for current user
    vm.mailboxId = $stateParams.hasOwnProperty('mailboxId') ?
      $stateParams.mailboxId : 1;
    // Inbox
    vm.inbox = [];
    // Active conversation
    vm.activeConv = null;
    // Mail reply form toggler
    vm.mailReplyForm = false;

    // Sorting inbox: conversations with last recived mails will go on top
    function sortInbox(c1, c2) {
      var d1 = c1.mails[c1.mails.length - 1].received;
      var d2 = c2.mails[c2.mails.length - 1].received;

      if (d1 > d2) {
        return 1;
      } else if (d1 < d2) {
        return -1;
      }

      return 0;
    }

    // Get inbox mails
    function getInbox() {
      mailboxService.getInbox(vm.mailboxId).then(function(res) {
        if (res.length > 0) {
          $log.log(res);
          vm.inbox = res.sort(sortInbox).reverse();

          vm.inbox.forEach(function(conv) {
            conv.mails.forEach(function(mail) {
              mail.preview = textFromHTMLFilter(mail.body);
              mail.active = false;
              mail.replyForm = false;
            });
          });
        }
      }, function() { $log.log('Mailbox error'); });
    }

    // Select active conversation for detailed view
    vm.selectConv = function(conv) {
      vm.inbox.forEach(function(elem) {
        if (elem.hasOwnProperty('active') && elem.active) { elem.active = false; }
      });
      conv.active = true;
      conv.mails[conv.mails.length - 1].active = true;
      vm.activeConv = conv;
    };

    // Toggle mail reply form
    vm.toggleReplyForm = function() {
      vm.mailReplyForm = !vm.mailReplyForm;
    };

    getInbox();
  });
