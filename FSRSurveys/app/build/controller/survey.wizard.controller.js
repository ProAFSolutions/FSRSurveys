var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var WizardController = (function (_super) {
        __extends(WizardController, _super);
        function WizardController($scope, dataContext, surveyService) {
            _super.call(this, $scope, dataContext, surveyService);
            this.isRunningMobile = false;
            this.init();
        }
        WizardController.prototype.init = function () {
            this.currentStep = 1;
            this.visibleNext = true;
            this.visibleSubmit = false;
            this.visiblePrev = false;
            this.visibleFinish = false;
            this.checkIfUserDirty();
        };
        //Events
        WizardController.prototype.nextClick = function () {
            this.stepClick(++this.currentStep);
        };
        WizardController.prototype.prevClick = function () {
            this.stepClick(--this.currentStep);
        };
        WizardController.prototype.submitClick = function () {
            var _this = this;
            this.surveyService.saveSurvey(this.dataContext.userInfo, this.dataContext.questionnaireData).then(function (response) {
                if (response && response === 'success') {
                    _this.stepClick(++_this.currentStep);
                }
            });
        };
        WizardController.prototype.closeClick = function () {
            location.href = "http://www.google.com";
        };
        WizardController.prototype.stepClick = function (step) {
            if (step > 1 && !this.dataContext.userInfo.validate())
                return;
            if (step > 2 && this.dataContext.sumbitBtnDisabled)
                return;
            this.currentStep = step;
            switch (step) {
                case 1:
                    {
                        this.visibleNext = true;
                        this.visibleSubmit = false;
                        this.visiblePrev = false;
                        this.visibleFinish = false;
                    }
                    break;
                case 2:
                    {
                        this.visibleNext = false;
                        this.visibleSubmit = true;
                        this.visiblePrev = true;
                        this.visibleFinish = false;
                    }
                    break;
                case 3:
                    {
                        this.visibleNext = false;
                        this.visibleSubmit = false;
                        this.visiblePrev = true;
                        this.visibleFinish = true;
                    }
                    break;
            }
        };
        WizardController.prototype.checkIfUserDirty = function () {
            var _this = this;
            var currentController = this;
            this.$scope.$watch(function () { return _this.dataContext.userInfo; }, function (newValue, oldValue) {
                if (newValue != oldValue) {
                    currentController.isUserInfoValid = newValue.validate();
                }
            }, true);
        };
        return WizardController;
    }(survey.AbstractController));
    survey.WizardController = WizardController;
    angular.module("survey")
        .controller("WizardController", WizardController);
})(survey || (survey = {}));
//# sourceMappingURL=survey.wizard.controller.js.map