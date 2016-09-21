'use strict';

angular
  .module('inspinia')
  .config(Decorate);

function Decorate($provide) {
  var attr = 'crm-select-multiple';

  // ui-select decorator with custom template
  $provide.decorator('uiSelectDirective', function($delegate) {
    var selectMatch = $delegate[0];
    var tempFunc = selectMatch.templateUrl;

    selectMatch.templateUrl = function(elem, atts) {

      if (elem[0].hasAttribute(attr) || elem[0].hasAttribute('data-' + attr)) {
        return 'app/common/directives/select-multiple.html';
      } else {
        return tempFunc(elem, atts);
      }
    };

    return $delegate;
  });

  // ui-select-match decorator with custom template
  $provide.decorator('uiSelectMatchDirective', function($delegate) {
    var selectMatch = $delegate[0];
    var tempFunc = selectMatch.templateUrl;

    selectMatch.templateUrl = function(elem, atts) {
      var parent = elem.parent()[0];

      if (parent.hasAttribute(attr) || parent.hasAttribute('data-' + attr)) {
        elem.addClass('ui-select-match');

        return 'app/common/directives/select-multiple-match.html';
      } else {
        return tempFunc(elem, atts);
      }
    };

    return $delegate;
  });
}
