'use strict';

angular.module('inspinia')
  .controller('SettingsCtrl', function ($http, $scope, mailboxService) {

    var vm = this;
    var getMailboxes;

    vm.userName = 'Example user';
    vm.helloText = 'Welcome in CRM SeedProject';
    vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

    $scope.addMailbox = function(mailbox) {  
      mailboxService.create(mailbox);

   }

  getMailboxes = function() {
   mailboxService.get().then(function(response) {
      console.log("got mailbox list");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.mailboxes = response;
    }, function(response) {
      console.log("Could not get mailboxes");
       console.log(response);
    });
  };

  $scope.init = function() {
    console.log("Running init in mailboxController sett");
    getMailboxes();

  };
  
  $scope.init();


  });
