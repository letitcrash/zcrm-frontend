angular.module('inspinia').directive('myElement', function () {
  return {
    scope: {
      item: '=myElement',
      onEdit: '&',
      mode: '@mode'
    },
    restrict: 'EA',
	template: '<td style="width:35px;"> <input class="green-check" type="checkbox" style="margin-left:10px;" name="vehicle" value="Car"></td><td class="project-title"><a ng-click="onEdit({emp:item})" class="client-link">{{item.user.contactProfile.firstname}} {{item.user.contactProfile.lastname}}</a> <br> <small ng-show="mode == 2">{{item.union.name}}</small></td><td class="hidden-xs" ng-hide="mode == 1 || mode == 2"><div>{{item.user.contactProfile.phoneNumberMobile}}</div></td><td class="hidden-xs" ng-hide="mode == 1 || mode == 2"><div>{{item.user.contactProfile.email}}</div></td><td class="hidden-xs" ng-hide="mode == 2"><div>{{item.union.name}}</div></td><td class="hidden-xs" ng-hide="mode == 1 || mode == 2"><div>{{item.position.name}}</div></td><td class="hidden-xs" ng-hide="mode == 2"><div>{{item.department.name}}</div></td><td class="hidden-xs" ng-hide="mode == 2">{{item.shift.name}}</td>'
    };
});



