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
            this.init();
        }
        WizardController.prototype.init = function () {
            this.currentStep = 1;
            this.visibleNext = true;
            this.visibleSubmit = false;
            this.visiblePrev = false;
            this.visibleFinish = false;
            this.isBusy = false;
            this.checkIfUserDirty();
            this.preventReload();
        };
        WizardController.prototype.preventReload = function () {
            var _this = this;
            var currentController = this;
            $(window).on("beforeunload", function () {
                if (_this.currentStep < 3 && currentController.dataContext.isSurveyDirty)
                    return 'Changes you made may not be saved';
                return;
            });
        };
        WizardController.prototype.nextClick = function () {
            this.stepClick(++this.currentStep);
        };
        WizardController.prototype.prevClick = function () {
            this.stepClick(--this.currentStep);
        };
        WizardController.prototype.submitClick = function () {
            var _this = this;
            this.isBusy = true;
            this.surveyService.saveSurvey(this.dataContext.userInfo, this.dataContext.questionnaireData).then(function (response) {
                _this.isBusy = false;
                if (response && response === 'success') {
                    _this.stepClick(++_this.currentStep);
                }
            }, function (error) {
                _this.isBusy = false;
                console.log(error);
            });
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
        WizardController.prototype.populateQuestionnaire = function () {
            var _this = this;
            var currentController = this;
            this.isBusy = true;
            this.surveyService.resolveCategories().then(function (response) {
                var categories = response;
                for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
                    var category = categories_1[_i];
                    _this.dataContext.questionnaireData.push(new survey.QuestionnaireItem(category, new survey.Answer()));
                }
                if (categories[categories.length - 1].name !== 'Other') {
                    _this.dataContext.questionnaireData.push(new survey.QuestionnaireItem(new survey.Category(0, 'Other', ''), new survey.Answer()));
                }
                _this.isBusy = false;
            }, function (error) {
                _this.isBusy = false;
                console.log(error);
            });
        };
        WizardController.prototype.closeClick = function () {
            location.href = "https://www.fsresidential.com";
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
                        if (this.dataContext.questionnaireData == null || this.dataContext.questionnaireData.length == 0) {
                            this.populateQuestionnaire();
                        }
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
        return WizardController;
    }(survey.AbstractController));
    survey.WizardController = WizardController;
    angular.module("survey")
        .controller("WizardController", WizardController);
})(survey || (survey = {}));
