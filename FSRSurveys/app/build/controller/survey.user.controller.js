var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var UserController = (function (_super) {
        __extends(UserController, _super);
        function UserController($scope, cache, surveyService) {
            _super.call(this, $scope, cache, surveyService);
            this.init();
        }
        UserController.prototype.init = function () {
            this.userInfo = this.$scope.surveyType == 1 ? new survey.ManagerInfo() : new survey.AdminInfo();
            this.propertyTypeOptions = ['Sited', 'Non-Sited', 'Mixed Sited and Non-Sited'];
            this.associateType = "Manager";
            this.populateMarketOptions();
        };
        UserController.prototype.populateMarketOptions = function () {
            var controller = this;
            this.surveyService.resolveMarkets().then(function (response) {
                controller.marketOptions = response;
            });
        };
        return UserController;
    }(survey.AbstractController));
    angular.module("survey")
        .controller("UserController", UserController);
})(survey || (survey = {}));
//# sourceMappingURL=survey.user.controller.js.map