var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var WizardController = (function (_super) {
        __extends(WizardController, _super);
        function WizardController($scope, surveyService) {
            _super.call(this, $scope, surveyService);
            this.init();
        }
        WizardController.prototype.init = function () {
            this.$scope.surveyType = 1;
            this.currentStep = 1;
            this.visibleNext = true;
            this.visiblePrev = false;
            this.visibleFinish = false;
            this.porcentage = 20;
        };
        //Events
        WizardController.prototype.nextClick = function () {
            ++this.currentStep;
            if (this.currentStep > 1) {
                this.visiblePrev = true;
                if (this.currentStep == 3) {
                    this.visibleNext = false;
                    this.visibleFinish = true;
                }
            }
        };
        WizardController.prototype.prevClick = function () {
            --this.currentStep;
            if (this.currentStep < 3) {
                this.visibleNext = true;
                this.visibleFinish = false;
                if (this.currentStep == 1) {
                    this.visibleNext = true;
                    this.visiblePrev = false;
                }
            }
        };
        WizardController.prototype.finishClick = function () {
        };
        WizardController.prototype.stepClick = function (step) {
            this.currentStep = step;
            switch (step) {
                case 1:
                    {
                        this.visibleNext = true;
                        this.visiblePrev = false;
                        this.visibleFinish = false;
                    }
                    break;
                case 2:
                    {
                        this.visibleNext = true;
                        this.visiblePrev = true;
                        this.visibleFinish = false;
                    }
                    break;
                case 3:
                    {
                        this.visibleNext = false;
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
//# sourceMappingURL=survey.wizard.controller..js.map