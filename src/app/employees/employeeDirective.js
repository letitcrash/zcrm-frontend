angular.module('inspinia').directive('myElement', function () {
  return {
    scope: {
      item: '=myElement',
      onEdit: '&'
    },
    restrict: 'EA',
    template: '<td style="width:35px;"> <input type="checkbox" style="margin-left:10px;" name="vehicle" value="Car"></td><td class="client-avatar"><img alt="image" src="img/a2.jpg"> </td><td><a ng-click="onEdit({emp:item})" class="client-link">{{item.user.contactProfile.firstname}} {{item.user.contactProfile.lastname}}</a></td><td><span class="label label-primary">HKVO</span></td><td>{{item.user.contactProfile.phoneNumberMobile}}</td><td>{{item.user.contactProfile.email}}</td><td>{{item.union.name}}</td><td>{{item.user.position}}</td><td>ROV</td><td>D</td>'
    };
});



