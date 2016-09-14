'use strict';

angular
  .module('inspinia')
  // TODO: Maybe we must create another module for general filters like this two bellow.
  // Extract text from DOM elems.
  .filter('textFromHTML', function($sanitize) {
    return function(html) {
      var sanitized = $sanitize(html.trim());
      var elem = angular.element(sanitized.slice(sanitized.indexOf('<')).slice(0, sanitized.lastIndexOf('>') - 1));

      return elem.length > 0 ? elem[0].textContent.trim() : sanitized;
    }
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
  .controller("MailboxController", function($log, $state, $stateParams, mailboxService, $timeout) {
    // View
    var vm = this;

    // Get current mailbox for current user
    if ($state.params.hasOwnProperty('mailboxId')) {
      vm.mboxId = parseInt($state.params.mailboxId);

      mailboxService.mailboxes.get(vm.mboxId).then(function(res) {
        mailboxService.mailboxes.selected = res;
      });
    }
    // Page header params
    vm.header = {
      title: {icon: '', content: ''},
      backBtnUrl: '',
      refresh: {tooltip: '', func: function() { return false; }, hidden: false},
      search: {placeholder: 'Search email by user, text or ticket', func: function() { return false; }},
      createNew: {title: 'New email', func: function() { return false; }}
    };
    // Show action menu
    vm.showActionMenu = false;
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
    // Load statuses
    // 0 - error, 1 - success, 2 - loading
    vm.loadStats = {emailForm: 1};

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

    // Add or remove message from selected
    function updateSelectedMsgs(msg) {
      if (msg.selected)
        vm.selectedMsgs.push(msg);
      else
        vm.selectedMsgs.splice(vm.selectedMsgs.indexOf(msg), 1);
    }

    // Toggle selection of message or all of messages in conversation
    vm.toggleMsgSelection = function toggleMsgSelection(conv, msg) {
      if (msg != null) {
        conv.selectedMsgs = msg.selected ? conv.selectedMsgs + 1 : conv.selectedMsgs - 1;
        conv.selected = conv.selectedMsgs === conv.mails.length ? true : false;
        updateSelectedMsgs(msg);
      } else {
        conv.selectedMsgs = conv.selected ? conv.mails.length : 0;
        conv.mails.forEach(function(msg) {
          msg.selected = conv.selected;
          updateSelectedMsgs(msg);
        });
      }

      vm.showActionMenu = vm.selectedMsgs.length > 0 ? true : false;
    };

    // Selected all messages and conversations
    vm.selectAllMsgs = function selectAllMsgs() {
      vm.convList.forEach(function(conv) {
        conv.selected = true;
        conv.selectedMsgs = conv.mails.length;

        conv.mails.forEach(function(msg) {
          msg.selected = true;
          updateSelectedMsgs(msg);
        });
      });
    };

    // Clear all selected messages
    vm.clearSelectedMsgs = function clearSelectedMsgs() {
      vm.selectedMsgs.forEach(function(msg) { msg.selected = false; });
      vm.selectedMsgs = [];
      vm.convList.forEach(function(conv) {
        conv.selected = false;
        conv.selectedMsgs = 0;
      });
      vm.showActionMenu = false;
    };

    // Email model for compose form
    var eModel = {
      sender: '',
      receiver: [],
      subject: '',
      body: '',
      emptySubj: false,
      emptyBody: false,
      showFormStatus: false
    };
    vm.emailFormModel = eModel;

    // Clear email model for compose form
    function clearEmailModel() {
      eModel.sender = mailboxService.mailboxes.selected.login;
      eModel.receiver = [];
      eModel.subject = '';
      eModel.body = '';
    }

    // Open form for composing new email
    vm.composeEmail = function composeEmail() {
      clearEmailModel();
      vm.slidebox.active = true;
      vm.slidebox.title = 'Compose Email';
      $log.log(eModel);
      $log.log(vm.emailFormModel);
      $log.log(vm.form);
    };

    // Open form for replying to email/conversation
    vm.replyEmail = function replyEmail(msg) {
      clearEmailModel();

      if (angular.isObject(msg) && msg.hasOwnProperty('sender')) {
        eModel.receiver.push(msg.sender);
      } else {
        vm.convView.msgList.forEach(function(msg) {
          if (eModel.receiver.indexOf(msg.sender) === -1) { eModel.receiver.push(msg.sender); }
        });
      }

      eModel.subject = msg.subject;
      vm.slidebox.title = 'Reply';
      vm.slidebox.active = true;
    };

    // Hide email form
    vm.hideEmailForm = function hideEmailForm(form) {
      clearEmailModel();
      form.$rollbackViewValue();
      form.$setPristine();
      form.$setUntouched();
      vm.slidebox.active = false;
      vm.showEmailFormOverlay = false;
    };

    // Show form overlay placeholder
    vm.showEmailFormOverlay = false;

    // Submit email form
    vm.submitEmailForm = function submitEmailForm(form, force) {
      eModel.emptySubj = form.subject.$isEmpty(eModel.subject) ? true : false;
      eModel.emptyBody = form.body.$isEmpty(eModel.body) ? true : false;
      vm.showEmailFormOverlay = true;
      vm.loadStats.emailForm = 0;

      if (force || (!eModel.emptySubj || !eModel.emptyBody)) {
        vm.loadStats.emailForm = 2;
        $timeout(function() {
          vm.loadStats.emailForm = 1
        }, 3000);
      }
    };
  });
