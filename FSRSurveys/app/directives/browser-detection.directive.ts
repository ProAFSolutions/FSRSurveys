/// <reference path="../definitely-typed/jquery.browser.d.ts" />

namespace survey {

    class BrowserDetectDirective implements ng.IDirective { 

        static instance(): ng.IDirective {
            return new BrowserDetectDirective;
        }
        public restrict = 'A';      
        public link(scope: any, elements: ng.IAugmentedJQuery, attrs: ng.IAttributes): void {
            $(window).on("load", () => {
                $("body").addClass($.browser.name);
            });
        }
    }

    angular.module('survey').directive('browserDetect', BrowserDetectDirective.instance);
}