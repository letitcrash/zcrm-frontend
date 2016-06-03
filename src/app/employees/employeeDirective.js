angular.module('inspinia').directive('myElement', function () {
  return {
    scope: {
      item: '=myElement',
      onEdit: '&'
    },
    restrict: 'EA',
	template: '<td style="width:35px;"> <input class="green-check" type="checkbox" style="margin-left:10px;" name="vehicle" value="Car"></td><td><div><a ng-click="onEdit({emp:item})" class="client-link">{{item.user.contactProfile.firstname}} {{item.user.contactProfile.lastname}}</a></div></td><td><span class="label label-primary">HKVO</span></td><td><div>{{item.user.contactProfile.phoneNumberMobile}}</div></td><td><div>{{item.user.contactProfile.email}}</div></td><td><div>{{item.union.name}}</div></td><td><div>{{item.position.name}}</div></td><td><div>{{item.department.name}}</div></td><td>{{item.shift.name}}</td>'
    };
});



