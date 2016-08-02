'use strict';

angular
  .module('inspinia')
  .controller("MailboxListController", function($log, $scope, mailboxService) {
    // View
    var vm = this;

    // Page header
    $scope.mbox.header.title.icon = 'fa fa-list-alt';
    $scope.mbox.header.title.content = 'Mailboxes';
    // Refresh mailboxes
    // $scope.mbox.header.refresh.func = function refreshMboxes() { vm.getMailboxes(vm.pages.pSize, 1); };
    // Search bar
    $scope.mbox.header.search.placeholder = 'Search mailboxes by login name or by ID';
    // Create mailbox
    $scope.mbox.header.createNew.title = 'New mailbox';
    $scope.mbox.header.createNew.func = function createMailbox() {
      $scope.mbox.slidebox.mailbox = {id: null, server: '', login: '', password: ''};
      $scope.mbox.slidebox.title = 'Create mailbox';
      $scope.mbox.slidebox.active = true;
    };

    // Pagination settings
    vm.pages = {pNr: 1, pSize: 50, pCount: 1};

    // Mailboxes
    vm.mailboxes = [];

    // Get mailboxes for user
    vm.getMailboxes = function getMailboxes(pSize, pNr, sTerm) {
      mailboxService.mailboxes.all(pSize, pNr, sTerm).then(function(res) {
        if (res.hasOwnProperty('data') && res.data.length > 0) {
          mailboxService.mailboxes.list = res.data;
          vm.mailboxes = mailboxService.mailboxes.list;
        }
      }, function() { return $log.log('Failed to get mailboxlist'); });
    };

    // Slide box template
    $scope.mbox.slidebox.template = 'app/mail/mailbox.mbox-form.html';
    $log.log($scope.mbox.slidebox);

    // Edit mailbox settings
    vm.editMailbox = function editMailbox(box) {
      $scope.mbox.slidebox.mailbox = box;
      $scope.mbox.slidebox.title = 'Edit';
      $scope.mbox.slidebox.active = true;
    };

    // vm.getMailboxes(vm.pages.pSize, vm.pages.pNr);
    for (var i = 1; i < 21; i++) {
      vm.mailboxes.push({
        id: i,
        server: 'https://outlook.office365.com/EWS/Exchange.asmx',
        login: 'test@rowanie.no',
        password: '1234' + i
      });
    }
  });
