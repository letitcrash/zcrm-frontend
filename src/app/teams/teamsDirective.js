angular.module('inspinia').directive('tmElement', function () {
  return {
    scope: {
      item: '=tmElement',
      onEdit: '&'
    },
    restrict: 'EA',
    template: '<td style="width:35px;"> <input type="checkbox" style="margin-left:10px;" name="vehicle" value="Car"></td><td><a ng-click="onEdit({tm:item})" class="client-link">{{item.name}} </a></td><td>{{item.contactProfile.firstname}} {{item.contactProfile.lastname}}</td><td>{{item.contactProfile.email}}</td>'
    };
});



