/// <reference path="../definitely-typed/jquery.browser.d.ts" />
var survey;
(function (survey) {
    var BrowserDetectDirective = (function () {
        function BrowserDetectDirective() {
            this.restrict = 'A';
        }
        BrowserDetectDirective.instance = function () {
            return new BrowserDetectDirective;
        };
        BrowserDetectDirective.prototype.link = function (scope, elements, attrs) {
            $(window).on("load", function () {
                $("body").addClass($.browser.name);
            });
        };
        return BrowserDetectDirective;
    }());
    angular.module('survey').directive('browserDetect', BrowserDetectDirective.instance);
})(survey || (survey = {}));
//# sourceMappingURL=browser-detection.directive.js.map