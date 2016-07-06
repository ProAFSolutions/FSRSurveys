var survey;
(function (survey) {
    var SurveyController = (function () {
        function SurveyController(surveyService) {
            this.surveyService = surveyService;
            this.initVars();
            this.resolveCategories();
            this.resolveMarketData();
            this.setupPropertyTypes();
        }
        SurveyController.prototype.initVars = function () {
            this.currentStep = 1;
            this.visibleNext = true;
            this.visiblePrev = false;
            this.visibleFinish = false;
            this.porcentage = 0;
            this.sliderOptions = { floor: 0, ceil: 25 };
            this.userInfo = new survey.UserInfo();
        };
        SurveyController.prototype.resolveCategories = function () {
            this.categories = new Array();
            this.categories.push(new survey.Category("Category1", "JobActivity1", 5, "AcivityOwner", "AcivityPerformed", "Technology"));
            this.categories.push(new survey.Category("Category2", "JobActivity2", 5, "AcivityOwner2", "AcivityPerformed", "Technology"));
            this.categories.push(new survey.Category("Category3", "JobActivity3", 5, "AcivityOwner3", "AcivityPerformed", "Technology"));
        };
        SurveyController.prototype.resolveMarketData = function () {
            var controller = this;
            var result = this.surveyService.resolveMarketStates();
            result.get(function (response) {
                if (response) {
                    controller.marketOptions = response.RestResponse.result;
                }
            });
        };
        SurveyController.prototype.setupPropertyTypes = function () {
            this.propertyTypeOptions = new Array();
            this.propertyTypeOptions.push('Sited', 'Non-Sited', 'Mixed Sited and Non-Sited');
        };
        SurveyController.prototype.nextClick = function () {
            ++this.currentStep;
            if (this.currentStep > 1) {
                this.visiblePrev = true;
                if (this.currentStep == 3) {
                    this.visibleNext = false;
                    this.visibleFinish = true;
                }
            }
        };
        SurveyController.prototype.prevClick = function () {
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
        SurveyController.prototype.finishClick = function () {
        };
        SurveyController.$inject = ["SurveyService"];
        return SurveyController;
    }());
    angular.module("survey")
        .controller("SurveyController", SurveyController);
})(survey || (survey = {}));
//# sourceMappingURL=survey.controller.js.map