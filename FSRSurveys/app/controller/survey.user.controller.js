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
            this.emailExists = false;
            this.init();
        }
        UserController.prototype.init = function () {
            this.propertyTypeOptions = ['Sited', 'Non-Sited', 'Mix of Sited and Non-Sited'];
            this.associateOptions = [
                {
                    name: 'Property Manager',
                    value: 'Manager'
                },
                {
                    name: 'Assistant Manager',
                    value: 'Assistant'
                },
                {
                    name: 'Property Administrator',
                    value: 'Administrator'
                }
            ];
            this.associateType = this.associateOptions[0];
            this.dataContext.userInfo = new survey.ManagerInfo();
            this.dataContext.userInfo.associateType = this.associateType.value;
            this.populateMarkets();
            this.setupWatchers();
        };
        UserController.prototype.setupWatchers = function () {
            var _this = this;
            var currentController = this;
            this.$scope.$watch(function () { return _this.associateType; }, function (newValue, oldValue) {
                if (newValue.value != oldValue.value) {
                    if (newValue.value === 'Manager') {
                        var managerInfo = new survey.ManagerInfo();
                        managerInfo.associateType = 'Manager';
                        managerInfo.copyFrom(_this.dataContext.userInfo);
                        _this.dataContext.userInfo = managerInfo;
                    }
                    else if (newValue.value === 'Administrator') {
                        var adminInfo = new survey.AdminInfo();
                        adminInfo.associateType = 'Administrator';
                        adminInfo.copyFrom(_this.dataContext.userInfo);
                        _this.dataContext.userInfo = adminInfo;
                    }
                    else {
                        var assistantInfo = new survey.AssistantInfo();
                        assistantInfo.associateType = 'Assistant';
                        assistantInfo.copyFrom(_this.dataContext.userInfo);
                        _this.dataContext.userInfo = assistantInfo;
                    }
                }
            }, true);
            this.$scope.$watch(function () { return _this.marketSelected; }, function (newValue, oldValue) {
                if (newValue != oldValue) {
                    currentController.dataContext.userInfo.marketName = newValue.name;
                }
            });
            this.$scope.$watch(function () { return _this.dataContext.userInfo.propertyType; }, function (newValue, oldValue) {
                if (newValue != oldValue) {
                    if (newValue !== 'Sited') {
                        _this.dataContext.userInfo.propertyName = null;
                    }
                }
            });
        };
        UserController.prototype.populateMarkets = function () {
            this.marketsOptions = new Array();
            for (var _i = 0, _a = this.getStates(); _i < _a.length; _i++) {
                var state = _a[_i];
                this.marketsOptions.push(new survey.Market(state, "US"));
            }
            for (var _b = 0, _c = this.getProvinces(); _b < _c.length; _b++) {
                var province = _c[_b];
                this.marketsOptions.push(new survey.Market(province, "CANADA"));
            }
        };
        UserController.prototype.getProvinces = function () {
            return [
                'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland Nova Scotia', 'Ontario',
                'Prince Edward Island', 'Quebec', 'Saskatchewan'
            ];
        };
        UserController.prototype.getStates = function () {
            return [
                'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
                'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
                'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
                'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
            ];
        };
        UserController.prototype.invalidNumberInput = function (value) {
            return !value && value <= 0;
        };
        UserController.prototype.checkUser = function () {
            var controller = this;
            if (this.dataContext.userInfo.email) {
                this.surveyService.checkUser(this.dataContext.userInfo.email).then(function (response) {
                    controller.emailExists = response && response === true;
                });
            }
            else {
                this.emailExists = false;
                this.dataContext.userInfo.recoveryPassword = '';
            }
        };
        UserController.prototype.reloadDataClick = function () {
            var _this = this;
            if (confirm("Do you confirm you want to reload your information ?")) {
                this.surveyService.getQuestionnaireData(this.dataContext.userInfo.email, this.dataContext.userInfo.recoveryPassword).then(function (response) {
                    if (response && response.items.length > 0) {
                        _this.dataContext.userInfo = response.managerInfo ? response.managerInfo : response.adminInfo ? response.adminInfo : response.assistantInfo;
                        _this.dataContext.questionnaireData = response.items;
                    }
                    else {
                        alert("Sorry, your recovery password does not match our records, please try again, otherwise you won't be able to use the entered email address");
                        _this.dataContext.userInfo.recoveryPassword = '';
                    }
                });
            }
        };
        return UserController;
    }(survey.AbstractController));
    angular.module("survey")
        .controller("UserController", UserController);
})(survey || (survey = {}));
