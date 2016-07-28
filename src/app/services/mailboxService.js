'use strict';

angular.module('inspinia').factory('mailboxService', function(requestService, dataService) {
  var apiURL = 'users/{usrId}/mailboxes';
  var re = /{usrId}/;
  var mboxes = [];
  var selectedMsgs = [];

  function buildURLParams(mboxId, msgs, msgId, pSize, pNr, sTerm) {
    var usrId = dataService.getUserId();

    if (!angular.isNumber(usrId)) { return false; }

    var url = apiURL.replace(re, usrId);

    if (angular.isNumber(mboxId)) { url += '/' + mboxId; }

    if (angular.isString(msgs)) {
      url += '/' + msgs;

      if (angular.isNumber(msgId) && msgs === 'mails') { url += msgs + '/' + msgId; }
    }

    if (angular.isNumber(pSize) && angular.isNumber(pNr)) {
      url += '?pageSize=' + pSize + '&pageNr=' + pNr;

      if (angular.isString(sTerm)) { url += '&searchTerm=' + sTerm; }
    }

    return url;
  }

  return {
    mailboxes: {
      list: mboxes,
      all: function(pSize, pNr, sTerm) {
        return requestService.ttGet(buildURLParams(null, null, null, pSize, pNr, sTerm));
      },
      get: function(uId, mId) { return requestService.ttGet(buildURLParams(mId)); },
      create: function(uId, mbox) { return requestService.ttPost(buildURLParams(), mbox); },
      update: function(uId, mId, mbox) { return requestService.ttPut(buildURLParams(mId), mbox); }
    },
    messages: {
      inbox: function(mId, pSize, pNr, sTerm) {
        return requestService.ttGet(buildURLParams(mId, 'mails', null, pSize, pNr, sTerm));
      },
      outbox: function(mId, pSize, pNr) {
        return requestService.ttGet(buildURLParams(mId, 'outbox', null, pSize, pNr));
      },
      get: function(mboxId, msgId) { return requestService.ttGet(buildURLParams(mboxId, 'mails', msgId)); },
      create: function(mId, msg) { return requestService.ttPost(buildURLParams(mId, 'send'), msg); },
      selected: selectedMsgs
    }
  };
});

