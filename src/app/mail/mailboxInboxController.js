'use strict';

angular
  .module('inspinia')
  .controller("MailboxInboxController", function($log, $scope, $rootScope, $state, $stateParams, $sanitize, mailboxService,
        ticketService, dataService, textFromHTMLFilter) {
    // View
    var vm = this;

    // View title
    $scope.mbox.header = {
      icon: 'fa-envelope-o',
      title: 'Inbox',
      search: {placeholder: 'Search email by user, text or ticket'},
      btn: {title: 'New email', icon: 'fa-plus'},
      state: 'inbox'
    };
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

    // Get inbox
    function getInbox() {
      mailboxService.getInbox($scope.mbox.mailboxId, false, 20, 1).then(function(res) {
        $log.log(res);

        if (res.data.length > 0) {
          vm.inbox = res.data.sort(sortInbox).reverse();

          vm.inbox.forEach(function(conv) {
            conv.active = false;

            conv.mails.forEach(function(msg) {
              msg.preview = textFromHTMLFilter(msg.body);
              msg.active = false;
              msg.replyForm = false;
            });
          });
        }
      }, function() { $log.log('Mailbox error'); });
    }

    getInbox();
  });
