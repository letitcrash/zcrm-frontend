'use strict';

angular
  .module('inspinia')
  .controller("MailboxInboxController", function($log, $scope, $state, $stateParams, mailboxService,
        ticketService, dataService, textFromHTMLFilter) {
    // View
    var vm = this;

    // View header
    $scope.mbox.header = {
      icon: 'fa-envelope-o',
      title: 'Inbox',
      search: {placeholder: 'Search email by user, text or ticket'},
      createNew: {title: 'New email'},
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
    // Pages settings
    vm.pages = {current: 1, all: 1, onPage: 50, total: 0};

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
    vm.getInbox = function getInbox(p) {
      var page = angular.isNumber(p) ? p : 1;

      $scope.mbox.loadStatus = 2;

      if (page === 1) { vm.inbox = []; }

      mailboxService.getInbox($scope.mbox.mailboxId, false, vm.pages.onPage, page).then(function(res) {
        $log.log(res);

        if (res.data.length > 0) {
          if (vm.pages.total !== res.totalCount) { vm.pages.all = Math.ceil(res.totalCount / vm.pages.onPage); }
          vm.pages.total = res.totalCount;
          vm.pages.current = page;
          $log.log(vm.pages);
          // TODO: Delete local variable when sorting will be implemented on backend
          var inbox = res.data.sort(sortInbox).reverse();
          vm.inbox = vm.pages.current > 1 ? vm.inbox.concat(inbox) : inbox;

          vm.inbox.forEach(function(conv) {
            conv.active = false;

            conv.mails.forEach(function(msg) {
              msg.preview = textFromHTMLFilter(msg.body);
              msg.active = false;
              msg.replyForm = false;
            });
          });

          $scope.mbox.loadStatus = 0;
        } else {
          $scope.mbox.loadStatus = 1;
        }
      }, function() {
        $scope.mbox.loadStatus = 1;
        $log.log('Mailbox error');
      });
    }

    $scope.mbox.header.refresh = {func: vm.getInbox};

    vm.getInbox();
  });
