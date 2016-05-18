angular.module('inspinia').directive('myElement', function () {
  return {
    scope: {
      item: '=myElement',
      onEdit: '&'
    },
    restrict: 'EA',
    template: '<td style="width:35px;"> <input type="checkbox" style="margin-left:10px;" name="vehicle" value="Car"></td><td class="client-avatar"><img alt="image" src="img/a2.jpg"> </td><td><a ng-click="onEdit({emp:emp})" class="client-link">{{item.user.contactProfile.firstname}} {{item.user.contactProfile.lastname}}</a></td><td><span class="label label-primary">HKVO</span></td><td>{{item.user.contactProfile.phoneNumberMobile}}</td><td>{{item.user.contactProfile.email}}</td><td>IE Indastry Energy</td><td>Crane Operator</td><td>ROV</td><td>D</td>'
    };
});



