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
});

angular.module('ui.bootstrap').controller('Collapse', function ($scope) {
  $scope.isCollapsed = false;
});
