(function() {
	'use strict';

	angular.module('inspinia').factory('imagesService', imagesService);

	function imagesService(requestService) {
		console.log("imagesService initializing");

		function upload(file) {
			var url = "images/upload"
			return requestService.ttUploadFileRequest(url, 'POST', file);
		};

		return {
				upload: function(file) {
					console.log("uploading ", file);
					return upload(file);
			}
		}
	}
})();