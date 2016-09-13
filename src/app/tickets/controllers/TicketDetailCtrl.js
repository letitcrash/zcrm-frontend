'use strict';

angular
  .module('inspinia')
  .controller('TicketDetailCtrl', function($log, $state, $stateParams, $scope, ticketsAPI,
        textFromHTMLFilter) {
    // View
    var vm = this;

    // Selected ticket ID
    vm.ticketId = $state.params.ticketId;
    // Selected ticket
    vm.ticket = null;
    // Tab panel
    vm.tabs = [
      {icon: 'fa-comments-o', title: 'Messages', disabled: true},
      {icon: 'fa-envelope', title: 'E-mail', disabled: false, template: 'app/tickets/tickets.detail-email.html'},
      {icon: 'fa-user', title: 'People', disabled: false, template: 'app/tickets/tickets.detail-people.html'},
      {icon: 'fa-paperclip', title: 'Files', disabled: true},
      {icon: 'fa-history', title: 'History', disabled: true}
    ];
    vm.activeTab = 3;
    // Models
    vm.models = {clients: [], teams: [], agents: [], status: 1, priority: 0, descr: ''};
    // Forms
    vm.forms = {
      clients: {
        active: false,
        clear: function() {
          vm.forms.clients.active = false;
          vm.models.clients = vm.ticket.requesters.slice();
        }
      },
      teams: {
        active: false,
        clear: function() {
          vm.forms.teams.active = false;
          vm.models.teams = vm.ticket.teams.slice();
        }
      },
      agents: {
        active: false,
        clear: function() {
          vm.forms.agents.active = false;
          vm.models.agents = vm.ticket.members.slice();
        }
      },
      // TODO: Move to directive
      status: {
        active: false,
        titles: {1: 'New', 2: 'In progress', 3: 'Postponed', 4: 'Closed'},
        colors: {1: 'btn-danger', 2: 'btn-success', 3: 'btn-info', 4: 'btn-primary'},
        change: function(i) {
          var id = parseInt(i);

          vm.forms.status.active = id !== vm.ticket.status ? true : false;
          vm.models.status = id;
        },
        clear: function() {
          vm.forms.status.active = false;
          vm.models.status = vm.ticket.status;
        }
      },
      // TODO: Move to directive
      priority: {
        active: false,
        titles: {0: 'Low', 1: 'Middle', 2: 'High', 3: 'ASAP'},
        colors: {0: 'btn-default', 1: 'btn-info', 2: 'btn-warning', 3: 'btn-danger'},
        change: function(i) {
          var id = parseInt(i);

          vm.forms.priority.active = id !== vm.ticket.priority ? true : false;
          vm.models.priority = id;
        },
        clear: function() {
          vm.forms.priority.active = false;
          vm.models.priority = vm.ticket.priority;
        }
      },
      descr: {
        active: false,
        clear: function() {
          vm.forms.descr.active = false;
          vm.models.descr = vm.ticket.description;
        }
      }
    };
    // Attached emails
    vm.emails = [];

    // Get ticket
    vm.getTicket = function getTicket() {
      ticketsAPI.get(vm.ticketId).then(function(res) {
        $log.log(res);
        vm.ticket = res;
        vm.models.clients = vm.ticket.requesters.slice();
        vm.models.teams = vm.ticket.teams.slice();
        vm.models.agents = vm.ticket.members.slice();
        vm.models.descr = vm.ticket.description;
        vm.models.status = vm.ticket.status;
        vm.models.priority = vm.ticket.priority;
      }, function() { $log.log('Couldn\'t get Ticket details'); });
    };

    // TODO: Run on tab activation
    vm.getAttachedEmails = function getAttachedEmails() {
      ticketsAPI.getActions(vm.ticketId, [1]).then(function(res) {
        $log.log(res);
        vm.emails = res;
        vm.emails.forEach(function(item) {
          item.mail.preview = textFromHTMLFilter(item.mail.body);
          item.mail.active = false;
        });
      }, function(res) { $log.log(res); });
    };

    vm.getTicket();
    vm.getAttachedEmails();
  });
