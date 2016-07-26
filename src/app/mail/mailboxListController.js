'use strict';

angular
  .module('inspinia')
  .controller("MailboxListController", function($log, $scope) {
    // View
    var vm = this;

    // View title
    $scope.mbox.header = {
      icon: 'fa-list-alt',
      title: 'Mailboxes',
      search: {placeholder: 'Search mailboxes'},
      createNew: {title: 'New mailbox'},
      state: 'lbox'
    };

    // Mailboxes
    vm.mailboxes = $scope.main.mailboxes;

    // Slide box template
    $scope.mbox.slidebox.template = 'app/mail/mailbox.edit-form.html';
    $log.log($scope.mbox.slidebox);

    // Create mailbox
    $scope.mbox.header.btn.func = function createMailbox() {
      $scope.mbox.slidebox.mailbox = {id: null, server: '', login: '', password: ''};
      $scope.mbox.slidebox.title = 'Create';
      $scope.mbox.slidebox.active = true;
    };

    // Edit mailbox settings
    vm.editMailbox = function editMailbox(box) {
      $scope.mbox.slidebox.mailbox = box;
      $scope.mbox.slidebox.title = 'Edit';
      $scope.mbox.slidebox.active = true;
    };
  });
