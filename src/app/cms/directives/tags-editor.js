'use strict';

angular
.module('inspinia')

.directive('crmTagsEditor', function() {
  return {
    template: '<label class="col-sm-2 control-label ng-binding" >{{ "Tags" | translate }}:</label><div class="col-sm-10 control-label"><input placeholder="Name of page.." type="text" class="form-control" ng-model="addNews.tags"></div>'
  };
});
