'use strict';

angular.module('inspinia')
  .controller('MainController', function($log, $scope, $state, dataService, mailboxService) {
    // View
    var vm = this;
    // User ID
    var userId = dataService.getUserId();

    vm.state = $state;
    $log.log($state);
    vm.mailboxes = [];

    if (angular.isNumber(userId)) {
      // Get mailboxes list for user
      mailboxService.get(userId).then(function(res) {
        if (res.length > 0) {
          mailboxService.setList(res);
          vm.mailboxes = mailboxService.getList();
        }
      }, function() { return $log.log('Failed to get mailboxlist'); });
    }

    /*
    // Simple GET request example:
    $http({
      method: 'GET',
      url: 'http://192.168.1.50:9000/companies/3/positions'
    }).then(function successCallback(response) {

        console.log(response)
        $scope.positionsList = response.data.body;

      }, function errorCallback(response) {
        // called asynchronously if an error occurs
        // or server returns response with an error status.
      });






      var person = {name:"Alex",age:19};
      var employment = {title:"Software Developer",sellary:100500};
      var company = {name:"Multimedia Nordic",employees:8};

      var array = ["Samsung", "Apple", "HTC" ];
      person.gadgets = array;
      person.employment = employment;
      person.employment.company = company;
      $scope.obj = person;

      console.log($scope.obj);

          $scope.addEmptyPosition = function() {
            var position = {};
            $scope.positionsList.push(position);

          }


      $scope.save = function(position) {
        console.log(position)
        if(position.id) {
          var url = "http://192.168.1.50:9000/companies/3/positions/" + position.id;
          $http.put(url, position).success(function(response, status) {
                      console.log(response);
          })
        } else {
          var url = "http://192.168.1.50:9000/companies/3/positions";
          $http.post(url, position).success(function(response, status) {
                      console.log(response);
          })
        }


        $scope.editMode = false;
        }
        */
  });
