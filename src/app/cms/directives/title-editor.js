'use strict';

angular
.module('inspinia')

.directive('crmTitleEditor', function() {
  return {
    template: '<label class="col-sm-2 control-label ng-binding" >{{ "News Title" | translate }}:</label><div class="col-sm-10 control-label"><input placeholder="Name of page.." type="text" class="form-control" ng-model="addNews.title"></div>'
  };
});
