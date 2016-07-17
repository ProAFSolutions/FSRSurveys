var survey;
(function (survey) {
    var ResizeDirective = (function () {
        function ResizeDirective() {
            this.restrict = 'A';
            this.scope = {
                resizeMobile: '='
            };
        }
        ResizeDirective.instance = function () {
            return new ResizeDirective;
        };
        ResizeDirective.prototype.link = function (scope, elements, attrs) {
            $(window).on("load resize", function () {
                if (window.innerWidth < 992) {
                    scope.resizeMobile = true;
                }
                else {
                    scope.resizeMobile = false;
                }
                scope.$apply();
            });
        };
        return ResizeDirective;
    }());
    angular.module('survey').directive('resize', ResizeDirective.instance);
})(survey || (survey = {}));
//# sourceMappingURL=resize.directive.js.map