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
            this.propertyTypeOptions = ['Sited', 'Non-Sited', 'Mixed of Sited and Non-Sited'];
            this.cityOptions = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];
            this.marketOptions = [
                'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
                'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
                'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
                'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
            this.watchAssociateType();
            this.associateType = "Manager";
            this.dataContext.userInfo = new survey.ManagerInfo();
            this.watchAssociateType();
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
        UserController.prototype.checkUser = function () {
            var _this = this;
            var controller = this;
            if (this.dataContext.userInfo.email) {
                this.surveyService.getQuestionnaireData(this.dataContext.userInfo.email).then(function (response) {
                    if (response === 'empty')
                        return;
                    if (confirm("The system has detected a previous information associated to your email. Do you want to load it?")) {
                        _this.dataContext.userInfo = response.managerInfo != null ? response.managerInfo : response.adminInfo;
                        _this.dataContext.questionnaireData = response.items;
                    }
                });
            }
        };
        return UserController;
    }(survey.AbstractController));
    angular.module("survey")
        .controller("UserController", UserController);
})(survey || (survey = {}));
