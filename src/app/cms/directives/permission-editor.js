'use strict';

angular
.module('inspinia')

.directive('crmPermissionEditor', function() {
  return {
    template: '<div class="form-group">    <label class="col-sm-4 control-label ng-binding" >Show:</label>    <div class="col-sm-8">    <div class="line-check">    <input type="radio" ng-model="addNews.title" name="show" id="schow1" checked>    <input type="radio" ng-model="addNews.title" name="show" id="schow2">    <div>    <label for="schow1">Yes</label>    <label for="schow2">No</label>    </div>    </div>    </div>    </div>    <div class="hr-line-dashed"></div>    <div class="form-group">    <label class="col-sm-12 ng-binding" >Permission:</label>    <div class="col-sm-12">    <input class="green-check" type="radio" id="bttne1" name="perm" value="9" ng-model="addNews.permission">    <label for="bttne1">Employees</label>    <br />    <input class="green-check" type="radio" id="bttne2" name="perm" value="99" ng-model="addNews.permission" checked>    <label for="bttne2">Public</label>    </div>    </div>'
  };
}); 
