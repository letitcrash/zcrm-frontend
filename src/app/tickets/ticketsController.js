'use strict';
angular.module('inspinia').controller("TicketsCtrl", function($scope, $rootScope, $location, $state,$window, ticketService, employeeService, dataService, teamService, projectService) {
  var getTickets;

    $scope.selected = 1;

    
  getTickets = function(force, pageSize, pageNr, searchTerm, filter) {
   ticketService.getList(force, pageSize, pageNr, searchTerm).then(function(response) {
      console.log("got tickets");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.tickets = response;
      $scope.totalItems = response.totalSize;
    }, function(response) {
      console.log("Could not get tickets");
      $scope.page.error = "Could not get tickets";
      console.log(response);
    });
  };

  $scope.getTeams = function(searchTerm) {
    return teamService.getList(searchTerm).then(function(response) {
      return response.map(function(item) {
        //item.fullname = item.user.contactProfile.firstname + " " +item.user.contactProfile.lastname;
        return item;
      });
      }, function(response) {
      console.log("Could not get employees");
      console.log(response);
      return [];
    });
  };

  
  $scope.getEmloyees = function(searchTerm) {
    return employeeService.getTypeaheadList(searchTerm).then(function(response) {
      return response.map(function(item) {
        item.fullname = item.user.contactProfile.firstname + " " +item.user.contactProfile.lastname;
        return item;
      });
      }, function(response) {
      console.log("Could not get employees");
      console.log(response);
      return [];
    });
  };

  $scope.getProjects = function(searchTerm) {
    return projectService.getList(searchTerm).then(function(response) {
      return response.map(function(item) {
        return item;
      });
      }, function(response) {
      console.log("Could not get projects");
      console.log(response);
      return [];
    });
  };

  $scope.getClients = function(searchTerm) {
    return clientService.getList(searchTerm).then(function(response) {
      return response.map(function(item) {
        return item;
      });
      }, function(response) {
      console.log("Could not get clients");
      console.log(response);
      return [];
    });
  };
    
  $scope.empSelected = function(item, model, label, event) {
    console.log(item);
    $scope.currentTicket.members.push(item.user);
    $scope.temp.assignedCurrentUser = undefined;

  }

  $scope.clientSelected = function(item, model, label, event) {
    console.log(item);
    $scope.currentTicket.requesters.push(item.user);
    $scope.temp.assignedCurrentClient = undefined;
    console.log($scope.currentTicket);

  }

  $scope.teamSelected = function(item, model, label, event) {
    console.log(item);
    $scope.currentTicket.teams.push(item);
    $scope.temp.assignedCurrentTeam = undefined;

  }

  $scope.projectSelected = function(item, model, label, event) {
    console.log(item);
    $scope.currentTicket.project=item;
    $scope.temp.assignedCurrentProject = undefined;
  }

  $scope.commentTicket = function(ticket) {
    ticketService.commentTicket(ticket).then(function(response) {
      console.log("Tkt commented succesfully");
      console.log(response);    
      ticket.comments.push(response);
      $scope.currentTicket.comment = undefined;
    }, function(response) {
      console.log("Ticket commented could not be updated");
    //  $scope.page.error = "Ticket could not be created";
    });
  }

  $scope.addMyselfToAssigned = function() {

    $scope.currentTicket.members.push(dataService.getUser());

  };

  $scope.deleteUserFromFilter = function (emp) {
    var index = $scope.currentTicket.members.indexOf(emp);
    if (index > -1) {
      $scope.currentTicket.members.splice(index, 1);
    }
  };

  $scope.deleteClientFromFilter = function (emp) {
    var index = $scope.currentTicket.requesters.indexOf(emp);
    if (index > -1) {
      $scope.currentTicket.requesters.splice(index, 1);
    }
  };

  $scope.deleteTeamFromFilter = function (team) {
    var index = $scope.currentTicket.teams.indexOf(team);
    if (index > -1) {
      $scope.currentTicket.teams.splice(index, 1);
    }
  };

  $scope.openTicket = function (tkt) {
    ticketService.get(tkt.id).then(function(response) {
      console.log("got ticket");
      console.log(response);
      $scope.showLoadingMessage = false;
      $scope.currentTicket = response;
      $scope.mode = 1;

      if($scope.page.subtab == 2) {
        $scope.showTimeline();
      }

    }, function(response) {
      console.log("Could not get scope");
      $scope.page.error = "Could not get ticket";
      console.log(response);
    });
    //$window.location.href = '/#/index/tickets/' + tkt.id;
  };

  $scope.defaultMode = function () {
    $scope.mode = 0;
  };

  $scope.expandMode = function () {
    $scope.mode = 2;
  };

  $scope.compressMode = function () {
    $scope.mode = 1;
  };

  $scope.saveMembers = function (ticket) {
    ticketService.addMembersToTicket(ticket).then(function(response) {
      console.log("Tkt members list updated succesfully");
      console.log(response);    
      ticket.members = response;
      $scope.page.editParticipants = false;
    }, function(response) {
      console.log("Ticket members list could not be updated");
    //  $scope.page.error = "Ticket could not be created";
    });
  }
  $scope.saveClients = function (ticket) {
    ticketService.addClientsToTicket(ticket).then(function(response) {
      console.log("Tkt clients list updated succesfully");
      console.log(response);    
      ticket.requesters = response;
      $scope.page.editClients = false;
    }, function(response) {
      console.log("Ticket clients list could not be updated");
    //  $scope.page.error = "Ticket could not be created";
    });
  }

  $scope.saveTeams = function (ticket) {
    ticketService.addTeamsToTicket(ticket).then(function(response) {
      console.log("Tkt teams list updated succesfully");
      console.log(response);    
      ticket.teams = response;
      $scope.page.editTeams = false;
    }, function(response) {
      console.log("Ticket teams list could not be updated");
    //  $scope.page.error = "Ticket could not be created";
    });
  }

  $scope.saveProject = function (ticket) {
    ticketService.setProjectToTicket(ticket).then(function(response) {
      console.log("Tkt project updated succesfully");
      console.log(response);    
      ticket.project = response;
      $scope.page.editProjectAction = false;
    }, function(response) {
      console.log("Ticket project could not be updated");
    //  $scope.page.error = "Ticket could not be created";
    });
  }

  $scope.createTicketAction = function () {
    $scope.compressMode();
    $scope.currentTicket = {};
    $scope.currentTicket.members = [];
    $scope.currentTicket.teams = [];
    $scope.currentTicket.clients = [];
    $scope.currentTicket.requesters = [];
    $scope.currentTicket.project = {};
    $scope.currentTicket.id = null;
    
    $scope.currentTicket.status = {
      availableOptions: [
        {id: '1', name: 'New'},
        {id: '2', name: 'Open'},
        {id: '3', name: 'Posponed'},
        {id: '4', name: 'Resolved'}
      ],
        selectedOption: {id: '1', name: 'New'}
    };

    $scope.currentTicket.priority = {
      availableOptions: [
        {id: '0', name: 'Low'},
        {id: '1', name: 'Mid'},
        {id: '2', name: 'High'},
      ],
        selectedOption: {id: '1', name: 'Mid'}
      };

  };

  $scope.showTimeline = function() {
    ticketService.getActions($scope.currentTicket, [0]).then(function(response) {
      console.log("Tkt timeline loaded set succesfully");
      console.log(response);
      $scope.currentTicket.comments = response;
      $scope.page.subtab = 2;
    }, function(response) {
      console.log("Tkt timeline loaded load failed");
    });
  }

  $scope.setCurrentTicketStatus = function(status) {
    ticketService.setStatus(status, $scope.currentTicket).then(function(response) {
      console.log("Tkt status set succesfully");
      var ticket = $scope.tickets.filter(function( obj ) {
        return obj.id == $scope.currentTicket.id;
      });
      ticket[0].status = response.status;

      $scope.currentTicket.status = response.status;
    }, function(response) {
      console.log("Tkt status set failed");
    });
  };

  $scope.setCurrentTicketPriority = function(priority) {
    console.log("-------");
    console.log(priority);
    ticketService.setPriority(priority,$scope.currentTicket).then(function(response) {
      console.log("Tkt Priority set succesfully");
      console.log(response);    
      var ticket = $scope.tickets.filter(function( obj ) {
        return obj.id == $scope.currentTicket.id;
      });
      ticket[0].priority = response.priority;
      $scope.currentTicket.priority = response.priority;

    }, function(response) {
      console.log("Tkt Priority set failed");
    });
  };



  $scope.create = function(tkt) {
    $scope.page.error = undefined;
    ticketService.create(tkt).then(function(response) {
      console.log("Tkt created succesfully");
      console.log(response);     
      $scope.tickets.push(response);
      $scope.openTicket(response);
      $scope.page.notification = "Ticket created succesfully";
    }, function(response) {
      console.log("Ticket could not be created");
      $scope.page.error = "Ticket could not be created";
    });
  };

  $scope.update = function(ticket) {
    console.log(ticket);
    ticketService.update(ticket).then(function(response) {
      console.log("Project updated succesfully");
      console.log(response);
      var ticket = $scope.tickets.filter(function( obj ) {
        return obj.id == $scope.currentTicket.id;
      });
      ticket[0].subject = response.subject;
      ticket[0].description = response.description;
      ticket[0].deadline = response.deadline;
      console.log(ticket[0]);


      $scope.currentTicket = response;

      
      $scope.page.editSubjectAction = false;
      $scope.page.editDescriptionAction = false;
      $scope.page.editDeadLineAction = false;

    }, function(response) {
      console.log("Project could not be updated");
    });
  };

  $scope.deleteTicket = function(ticket) {
    var tckt = $scope.tickets.filter(function( obj ) {
        return obj.id == $scope.currentTicket.id;
      });
    var index = $scope.tickets.indexOf(tckt[0]);
    console.log(ticket);    
    ticketService.delete(ticket).then(function(response) {
      console.log("deleted");
      
      if (index >= 0) {
        $scope.tickets.splice(index, 1);
        console.log("doing splice");
      }
      $scope.defaultMode();
      $scope.currentTicket={};
    }, function(response) {
      console.log("not deleted");
    });
  };

  $scope.searchTickets = function() {
    var DELAY_AMOUNT, DELAY_KEY;
    $scope.pageNr = 1;
    console.log("Search with searchTerm:" + $scope.searchTerm);
    DELAY_AMOUNT = 500;
    DELAY_KEY = "searchTicketDelay";
    generalUtils.delayFunction(DELAY_KEY, DELAY_AMOUNT).then(function() {
      getTickets(true, $scope.pageSize, $scope.pageNr, $scope.searchTerm, $scope.filter);
    });
  };
  $scope.filterClear = function() {
  console.log("filterClear");
  $scope.currentFilters.union = false;
  }

  $scope.init = function() {
    console.log("Running init in ticket Controller");
    //$scope.activeMail = false;
    $scope.showLoadingMessage = true;
    $scope.pageSize = 10;
    $scope.pageNr = 1;
    $scope.searchTerm = "";
    $scope.newPeriods = [];
    
    $scope.isCollapsed = false;
    $scope.showTicket = false;
    $scope.page = {};

    $scope.currentTicket = {};
    $scope.currentTicket.members = [];
    $scope.currentTicket.requesters = [];
    $scope.currentTicket.teams = [];
    $scope.currentTicket.clients = [];
    $scope.currentTicket.project = {};

    
    $scope.temp = {};
    

    getTickets(false, $scope.pageSize, $scope.pageNr, $scope.searchTerm);
    $scope.statusAvailableOptions =  [
        {id: '1', name: 'New'},
        {id: '2', name: 'Open'},
        {id: '3', name: 'Posponed'},
        {id: '4', name: 'Resolved'}
      ];
    
    $scope.priorityAvailableOptions =  [
        {id: '0', name: 'Low'},
        {id: '1', name: 'Mid'},
        {id: '2', name: 'High'}
    ];

  };
  
  $scope.init();


});
