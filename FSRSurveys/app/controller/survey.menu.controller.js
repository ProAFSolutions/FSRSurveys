var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var MenuController = (function (_super) {
        __extends(MenuController, _super);
        function MenuController($scope, dataContext, surveyService) {
            _super.call(this, $scope, dataContext, surveyService);
            this.isCollapsed = true;
            this.init();
        }
        MenuController.prototype.init = function () {
            var _this = this;
            var controller = this;
            this.$scope.$watch(function () { return _this.dataContext.isRunningMobile; }, function (newValue, oldValue) {
                controller.isCollapsed = true;
            });
        };
        MenuController.prototype.toogleClick = function () {
            this.isCollapsed = !this.isCollapsed;
        };
        return MenuController;
    }(survey.AbstractController));
    angular.module("survey")
        .controller("MenuController", MenuController);
})(survey || (survey = {}));
