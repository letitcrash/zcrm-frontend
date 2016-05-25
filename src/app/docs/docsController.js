'use strict';

angular.module('inspinia')
.controller('DocsController', function ($http, $scope, Upload, $timeout, dataService, docsService) {
  
  // File lists
  var files = [
  {
	"id": 1,
	"userId": 2,
	"hash": "asbwklaow",
	"fileName": "Filename.txt"
  },
  {
	"id": 1,
	"userId": 2,
	"hash": "asbwklaow",
	"fileName": "Filename.odt"
  },
  {
	"id": 3,
	"userId": 2,
	"hash": "asbwklaow",
	"fileName": "fasdf.pdf"
  },
  {
	"id": 4,
	"userId": 2,
	"hash": "asbwklaow",
	"fileName": "sdfgsdfgwer.ods"
  },
  {
	"id": 5,
	"userId": 2,
	"hash": "asbwklaow",
	"fileName": "wertwert.txt"
  },
  {
	"id": 6,
	"userId": 2,
	"hash": "asbwklaow",
	"fileName": "wertwert.odt"
  },
  {
	"id": 7,
	"userId": 2,
	"hash": "asbwklaow",
	"fileName": "wertew.pdf"
  }
  ];
  $scope.files = files;
  
  $scope.uploadFiles = function(files, errFiles) {
	$scope.files = files;
	$scope.errFiles = errFiles;
	angular.forEach(files, function(file) {
	  file.upload = Upload.upload({
		url: upUrl,
		data: {fileUpload: file}
	  });
	  
	  file.upload.then(function (response) {
		$timeout(function () {
		  console.log(response)
		  file.result = response.data;
		});
	  }, function (response) {
		if (response.status > 0)
		  $scope.errorMsg = response.status + ': ' + response.data;
	  }, function (evt) {
		console.log(evt);
		file.progress = Math.min(100, parseInt(100.0 * 
		evt.loaded / evt.total));
		console.log(file.progress);
	  });
	});
  }
  /*
  $scope.getUserFiles = function() {
	//docsService.get(dataService.getEmployments().id).then(function(response) {
	$http.get(upUrl).then(function(response) {
	  console.log("got files list");
	  console.log(response);
	  $scope.files = response.data;
	  $scope.showLoadingMessage = false;
	}, function(response) {
	  console.log("Could not get files");
	  console.log(response);
	});
  };
  $scope.getUserFiles();*/

});

angular.module('ui.bootstrap').controller('Collapse', function ($scope) {
  $scope.isCollapsed = false;
});
