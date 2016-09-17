angular.module('inspinia').directive('cpElement', function () {
  return {
    scope: {
      item: '=cpElement',
      onEdit: '&'
    },
    restrict: 'EA',
    template: '<td style="width:35px;"> <input class="green-check" type="checkbox" style="margin-left:10px;" name="vehicle" value="Car"></td><td><a ng-click="onEdit({cp:item})" class="client-link">{{item.name}} </a></td><td>{{item.contactProfile.firstname}} {{item.contactProfile.lastname}}</td><td>{{item.contactProfile.email}}</td><td>{{item.contactProfile.phoneNumberWork}}</td><td>-</td><td>-</td>'
    };
});



