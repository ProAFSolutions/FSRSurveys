﻿namespace survey {

    class ResizeDirective implements ng.IDirective { 

        static instance(): ng.IDirective {
            return new ResizeDirective;
        }
        public restrict = 'A';       
        public scope = {
            resizeMobile: '='
        }
        public link(scope: any, elements: ng.IAugmentedJQuery, attrs: ng.IAttributes): void {
            $(window).on("load resize", () => {               
                if (window.innerWidth < 480) {

                } 

                if (window.innerWidth < 992) {                                       
                    scope.resizeMobile = true;                    
                } else {
                    scope.resizeMobile = false;
                }  
                scope.$apply();            
            });
        }
    }

    angular.module('survey').directive('resize', ResizeDirective.instance);
}