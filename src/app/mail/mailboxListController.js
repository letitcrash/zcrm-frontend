'use strict';

angular
  .module('inspinia')
  // Check if new password and password confirmation are matched
  .directive("mboxCheckNewPswd", function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl){
        ctrl.$parsers.unshift(function(val) {
          var model = scope.vm.mboxModel;
          var valid = true;

          if (ctrl.$name === 'pswdNew' && scope.form.pswdCnf.$dirty) {
            valid = model.pswdCnf === val ? true : false;
            scope.form.pswdCnf.$setValidity('invalidNewPswd', valid);
          } else if (ctrl.$name === 'pswdCnf') {
            valid = model.pswdNew === val ? true : false;
            scope.form.pswdNew.$setValidity('invalidNewPswd', valid);
          }

          ctrl.$setValidity('invalidNewPswd', valid);

          return valid ? val : undefined;
        });
      }
    }
  })
  // Check if given password matched current
  .directive("mboxCheckCurPswd", function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, elem, attrs, ctrl){
        ctrl.$parsers.unshift(function(val) {
          if (val) {
            var valid = scope.vm.mboxModel.password === val ? true : false;

            ctrl.$setValidity('invalidCurPswd', valid);
          }

          return valid ? val : undefined;
        });
      }
    }
  })
  .controller("MailboxListController", function($log, $scope, mailboxService, $timeout) {
    // View
    var vm = this;
    // Page header
    var pheader = $scope.mbox.header;
    // Slidebox
    var sbox = $scope.mbox.slidebox;

    // Page header
    pheader.title.icon = 'fa fa-list-alt';
    pheader.title.content = 'Mailboxes';
    // Refresh mailboxes
    // $scope.mbox.header.refresh.func = function refreshMboxes() { vm.getMailboxes(vm.pages.pSize, 1); };
    // Search bar
    pheader.search.placeholder = 'Search mailboxes by login name or by ID';
    // Create mailbox
    pheader.createNew.title = 'New mailbox';
    pheader.createNew.func = function createMailbox() {
      vm.mboxModel = {toCreate: true, server: '', login: '', password: '', pswdCur: '', pswdNew: '', pswdCnf: ''};
      sbox.title = 'Create mailbox';
      sbox.active = true;
    };

    // Pagination settings
    vm.pages = {pNr: 1, pSize: 50, pCount: 1};

    // Load statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {mboxForm: 1}

    // Mailboxes
    vm.mailboxes = [];
    mailboxService.mailboxes.list = vm.mailboxes;

    // Get mailboxes for user
    vm.getMailboxes = function getMailboxes(pSize, pNr, sTerm) {
      mailboxService.mailboxes.all(pSize, pNr, sTerm).then(function(res) {
        if (res.hasOwnProperty('data') && res.data.length > 0) {
          mailboxService.mailboxes.list = res.data;
          vm.mailboxes = mailboxService.mailboxes.list;
        }
      }, function() { return $log.log('Failed to get mailboxlist'); });
    };

    // Select mailbox
    vm.selectMbox = function selectMbox(box) {
      $scope.mbox.mboxId = box.id;
      mailboxService.mailboxes.selected = box;
    };

    // Slide box settings
    sbox.template = 'app/mail/mailbox.mbox-form.html';
    sbox.vm = vm;

    // Edit mailbox settings
    vm.editMbox = function editMbox(box) {
      $log.log(sbox);
      vm.mboxModel = box;
      vm.mboxModel.toCreate = false;
      vm.mboxModel.changePswd = false;
      vm.mboxModel.pswdCur = '';
      vm.mboxModel.pswdNew = '';
      vm.mboxModel.pswdCnf = '';
      sbox.title = 'Edit mailbox';
      sbox.active = true;
    };

    // Hide mailbox form
    vm.hideMboxForm = function hideMboxForm(form) {
      vm.showMboxFormOverlay = false;
      form.$rollbackViewValue();
      form.$setPristine();
      form.$setUntouched();
      sbox.active = false;
    }

    // Create new mailbox
    function createMbox(form) {
      $timeout(function() {
        vm.loadStats.mboxForm = 1
      }, 3000);
    }

    // Update existing mailbox
    function updateMbox(form) {
      $timeout(function() {
        vm.loadStats.mboxForm = 0
      }, 3000);
    }

    // Submit mailbox form
    vm.submitMboxForm = function submitMboxForm(form) {
      form.$setSubmitted();

      vm.loadStats.mboxForm = 2;
      vm.showMboxFormOverlay = true;

      if (vm.mboxModel.toCreate) {
        createMbox(form);
      } else {
        updateMbox(form);
      }

      $log.log(form);
    };

    // vm.getMailboxes(vm.pages.pSize, vm.pages.pNr);
    // TODO: Delete test data
    for (var i = 1; i < 2; i++) {
      vm.mailboxes.push({
        id: i,
        server: 'https://outlook.office365.com/EWS/Exchange.asmx',
        login: 'test@rowanie.no',
        password: '1234' + i
      });
    }
  });
