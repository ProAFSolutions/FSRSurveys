var survey;
(function (survey) {
    var AvoidReloadDirective = (function () {
        function AvoidReloadDirective() {
            this.restrict = 'A';
        }
        AvoidReloadDirective.instance = function () {
            return new AvoidReloadDirective;
        };
        AvoidReloadDirective.prototype.link = function (scope, elements, attrs) {
        };
        return AvoidReloadDirective;
    }());
    angular.module('survey').directive('avoidReload', AvoidReloadDirective.instance);
})(survey || (survey = {}));
//# sourceMappingURL=avoid-reload.directive.js.map