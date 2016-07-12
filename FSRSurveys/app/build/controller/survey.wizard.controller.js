var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var WizardController = (function (_super) {
        __extends(WizardController, _super);
        function WizardController($scope, cache, surveyService) {
            _super.call(this, $scope, cache, surveyService);
            this.init();
        }
        WizardController.prototype.init = function () {
            this.currentStep = 1;
            this.visibleNext = true;
            this.visibleSubmit = false;
            this.visiblePrev = false;
            this.visibleFinish = false;
        };
        //Events
        WizardController.prototype.nextClick = function () {
            this.stepClick(++this.currentStep);
        };
        WizardController.prototype.prevClick = function () {
            this.stepClick(--this.currentStep);
        };
        WizardController.prototype.submitClick = function () {
            console.log(this.cache.questionnaireData);
            this.stepClick(++this.currentStep);
        };
        WizardController.prototype.closeClick = function () {
        };
        WizardController.prototype.stepClick = function (step) {
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
        return WizardController;
    }(survey.AbstractController));
    angular.module("survey")
        .controller("WizardController", WizardController);
})(survey || (survey = {}));
//# sourceMappingURL=survey.wizard.controller.js.map