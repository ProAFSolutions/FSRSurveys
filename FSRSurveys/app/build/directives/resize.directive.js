var survey;
(function (survey) {
    var ResizeDirective = (function () {
        function ResizeDirective() {
            this.restrict = 'A';
        }
        ResizeDirective.instance = function () {
            return new ResizeDirective;
        };
        ResizeDirective.prototype.link = function (scope, elements, attrs) {
            $(window).bind("load resize", function () {
                if (window.innerWidth < 992) {
                    $("body").addClass("small-view");
                }
                else {
                    $("body").removeClass("small-view");
                }
            });
        };
        return ResizeDirective;
    }());
    angular.module('survey').directive('resize', ResizeDirective.instance);
})(survey || (survey = {}));
//# sourceMappingURL=resize.directive.js.map