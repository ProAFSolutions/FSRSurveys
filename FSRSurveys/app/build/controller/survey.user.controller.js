var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var UserController = (function (_super) {
        __extends(UserController, _super);
        function UserController($scope, dataContext, surveyService) {
            _super.call(this, $scope, dataContext, surveyService);
            this.init();
        }
        UserController.prototype.init = function () {
            this.propertyTypeOptions = ['Sited', 'Non-Sited', 'Mixed Sited and Non-Sited'];
            this.watchAssociateType();
            this.associateType = "Manager";
            this.dataContext.userInfo = new survey.ManagerInfo();
            this.watchAssociateType();
            this.populateMarketOptions();
        };
        UserController.prototype.populateMarketOptions = function () {
            var controller = this;
            this.surveyService.resolveMarkets().then(function (response) {
                controller.marketOptions = new Array();
                for (var _i = 0, response_1 = response; _i < response_1.length; _i++) {
                    var market = response_1[_i];
                    controller.marketOptions.push(market.name);
                }
            });
        };
        UserController.prototype.watchAssociateType = function () {
            var _this = this;
            var currentController = this;
            this.$scope.$watch(function () { return _this.associateType; }, function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if (newValue === 'Manager') {
                        var managerInfo = new survey.ManagerInfo();
                        managerInfo.copyFrom(_this.dataContext.userInfo);
                        _this.dataContext.userInfo = managerInfo;
                    }
                    else {
                        var adminInfo = new survey.AdminInfo();
                        adminInfo.copyFrom(_this.dataContext.userInfo);
                        _this.dataContext.userInfo = adminInfo;
                    }
                }
            });
        };
        return UserController;
    }(survey.AbstractController));
    angular.module("survey")
        .controller("UserController", UserController);
})(survey || (survey = {}));
//# sourceMappingURL=survey.user.controller.js.map