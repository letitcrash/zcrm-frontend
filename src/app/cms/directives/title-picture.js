'use strict';

angular
.module('inspinia')

.directive('crmTitlePicture', function() {
  return {
    template: '<label class="col-sm-2 control-label ng-binding" >{{ "Title picture" | translate }}:</label>    <div class="col-sm-10 text-left">    <button class="btn btn-white" ngf-select="uploadFiles($files, $invalidFiles)" type="submit" data-provides="fileinput"><i class="fa fa-paperclip" ></i> {{ "Upload image" | translate }}</button></div>'
  };
});

