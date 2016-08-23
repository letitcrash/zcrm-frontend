'use strict';

angular
  .module('inspinia')
  .controller("MailboxInboxController", function($log, $scope, $state, $stateParams, mailboxService,
        ticketService, dataService, textFromHTMLFilter) {
    // View
    var vm = this;

    // Slidebox
    var sbox = $scope.mbox.slidebox;
    sbox.template = 'app/mail/mailbox.email-form.html'
    // Page header
    var pheader = $scope.mbox.header;

    // Page header
    pheader.title.icon = 'fa fa-inbox';
    pheader.title.content = 'Inbox';
    pheader.backBtnUrl = $state.href('index.mail.list');
    pheader.refresh.func = getInbox;
    pheader.search.placeholder = 'Search email by user, text or ticket';
    // Create mailbox
    pheader.createNew.title = 'New email';
    pheader.createNew.func = $scope.mbox.composeEmail;
    /*
    pheader.createNew.func = function createNewMsg() {
      sbox.title = 'Compose message';
      sbox.active = true;
    };
    */

    // Active conversation
    vm.activeConv = null;
    // Conversation view
    vm.convView = {active: false, title: '', msgList: []};
    // Attach to ticket form
    vm.attachMsgForm = {active: false, ticketId: null, msgList: []};
    // Pages settings
    vm.pages = {current: 1, all: 1, onPage: 50, total: 0};
    // Load statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {convList: 1, loadMore: 1};

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
    function getInbox(p) {
      var page = angular.isNumber(p) ? p : 1;
      var loadStat = page === 1 ? 'convList' : 'loadMore';

      vm.loadStats[loadStat] = 2;
      pheader.refresh.hidden = true;

      mailboxService.messages.inbox($scope.mbox.mboxId, vm.pages.onPage, page).then(function(res) {
        $log.log(res);

        if (res.data.length > 0) {
          if (vm.pages.total !== res.totalCount) { vm.pages.all = Math.ceil(res.totalCount / vm.pages.onPage); }
          vm.pages.total = res.totalCount;
          vm.pages.current = page;
          // TODO: Delete local variable when sorting will be implemented on backend
          var inbox = res.data.sort(sortInbox).reverse();
          $scope.mbox.convList = vm.pages.current > 1 ? $scope.mbox.convList.concat(inbox) : inbox;

          $scope.mbox.convList.forEach(function(conv) {
            conv.selected = false;
            conv.active = false;

            conv.mails.forEach(function(msg) {
              msg.preview = textFromHTMLFilter(msg.body);
              msg.active = false;
              msg.replyForm = false;
            });
          });

          vm.loadStats[loadStat] = 1;
        } else {
          vm.loadStats[loadStat] = 0;
        }

        pheader.refresh.hidden = false;
      }, function() {
        vm.loadStats[loadStat] = 0;
        pheader.refresh.hidden = false;
      });
    }

    vm.getInbox = getInbox;

    getInbox();
  });
