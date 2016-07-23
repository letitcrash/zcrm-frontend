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
        ticketService, dataService) {
    var vm = this;

    // Get current mailbox for current user
    vm.mailboxId = $stateParams.hasOwnProperty('mailboxId') ?
      $stateParams.mailboxId : 1;
    // Inbox
    vm.inbox = [];
    // Active conversation
    vm.activeConv = null;
    // Conversation view
    vm.convView = {active: false, title: '', msgList: []};
    // Selected messages
    vm.selectedMsgs = [];
    // Mail reply form toggler
    vm.msgReplyForm = false;
    // Attach to ticket form
    vm.attachMsgForm = {active: false, ticketId: null, msgList: []};
    // Tickets
    vm.tickets = [];
    // Slide box
    vm.slidebox = {active: false};

    // Sorting inbox: conversations with last recived mails will go on top
    vm.sortInbox = function sortInbox(c1, c2) {
      var d1 = c1.mails[c1.mails.length - 1].received;
      var d2 = c2.mails[c2.mails.length - 1].received;

      if (d1 > d2) {
        return 1;
      } else if (d1 < d2) {
        return -1;
      }

      return 0;
    }

    // Select active conversation for detailed view
    vm.selectConv = function(conv) {
      vm.inbox.forEach(function(elem) {
        if (elem.hasOwnProperty('active') && elem.active) { elem.active = false; }
      });
      conv.active = true;
      conv.mails[conv.mails.length - 1].active = true;
      vm.activeConv = conv;
      vm.convView.active = true;
      vm.convView.title = conv.mails[0].subject;
      vm.convView.msgList = conv.mails;
    };

    // Toggle message reply form
    vm.toggleReplyForm = function() {
      vm.msgReplyForm = !vm.msgReplyForm;
    };

    // Toggle attach to ticket form
    vm.toggleAttachMsgForm = function toggleAttachMsgForm() {
      if (!vm.attachMsgForm.active) {
        vm.convView.active = true;
        vm.convView.title = 'Selected messages';
      } else {
        vm.convView.active = false;
      }

      if (vm.attachMsgForm.active && vm.activeConv != null) {
        vm.convView.active = true;
        vm.convView.title = vm.activeConv.mails[0].subject;
        vm.convView.msgList = vm.activeConv.mails;
      }

      vm.attachMsgForm.active = !vm.attachMsgForm.active;
    };

    // Select messages for attaching to ticket
    vm.selectMsgsToAttach = function selectMsgsToAttach(data) {
      $log.log(data);
      mailboxService.setSelectedMsgs([].concat(data));
      $state.go('index.mail.attachMsgs', {mailboxId: vm.mailboxId});
    };

  });
