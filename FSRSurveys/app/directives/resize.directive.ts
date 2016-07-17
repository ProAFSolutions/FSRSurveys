namespace survey {

    class ResizeDirective implements ng.IDirective {

        static instance(): ng.IDirective {
            return new ResizeDirective;
        }

        public restrict = 'A';
        public link(scope: ng.IScope, elements: ng.IAugmentedJQuery, attrs: ng.IAttributes): void {
            $(window).bind("load resize", function () {
                if (window.innerWidth < 992) {
                    $("body").addClass("small-view");
                } else {
                    $("body").removeClass("small-view");
                }
            });
        }
    }

    angular.module('survey').directive('resize', ResizeDirective.instance);
}