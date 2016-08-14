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
  .controller("MailboxController", function($log, $state, $stateParams, mailboxService) {
    // View
    var vm = this;

    // Get current mailbox for current user
    vm.mailboxId = $stateParams.hasOwnProperty('mailboxId') ?
      $stateParams.mailboxId : 1;
    // Page header params
    vm.header = {
      title: {icon: '', content: ''},
      backBtnUrl: '',
      refresh: {tooltip: '', func: function() { return false; }, hidden: false},
      search: {placeholder: 'Search email by user, text or ticket', func: function() { return false; }},
      createNew: {title: 'New email', func: function() { return false; }}
    };
    // Conversations list
    vm.convList = [];
    // Conversation view
    vm.convView = {active: false, subject: '', msgList: [], idx: -1};
    // Selected messages
    vm.selectedMsgs = [];
    // Attach to ticket form
    vm.attachMsgForm = {active: false, ticketId: null, msgList: []};
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

    // View conversation details
    vm.viewConvDetail = function viewConvDetail(conv, idx) {
      vm.convList.forEach(function(elem) {
        if (elem.hasOwnProperty('selected') && elem.active) { elem.active = false; }
      });
      conv.active = true;
      conv.mails[conv.mails.length - 1].active = true;
      vm.convView.active = true;
      vm.convView.subject = conv.mails[0].subject;
      vm.convView.msgList = conv.mails;
      vm.convView.idx = idx;
    };

    // Hide conversation details
    vm.hideConvDetail = function hideConvDetail() {
      vm.convView.active = false;
      vm.convList[vm.convView.idx].active = false;
    }

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
