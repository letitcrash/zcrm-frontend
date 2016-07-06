'use strict';

angular.module('inspinia')
  .controller('SettingsCtrl', function ($http, $scope, mailboxService, dataService) {
  
  //inserted
    this.tab = 1;

    this.setTab = function (tabId) {
        this.tab = tabId;
    };

    this.isSet = function (tabId) {
        return this.tab === tabId;
    };
  
  $scope.hoverIn = function() {
    this.hoverEdit = true;
  };
  
  $scope.hoverOut = function() {
    this.hoverEdit = false;
  };
  //inserted

    var vm = this;
    var getMailboxes;

    vm.userName = 'Example user';
    vm.helloText = 'Welcome in CRM SeedProject';
    vm.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects.';

    $scope.addMailbox = function(mailbox) {  
      mailboxService.create(mailbox).then(function(response){
         console.log(response);
      },function(response){
         console.log(response);
      });

   }

  getMailboxes = function() {
   mailboxService.get(dataService.getEmployments().id).then(function(response) {
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
