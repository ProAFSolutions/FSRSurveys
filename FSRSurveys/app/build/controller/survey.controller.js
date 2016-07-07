var survey;
(function (survey) {
    var SurveyController = (function () {
        function SurveyController(surveyService) {
            this.surveyService = surveyService;
            this.init();
        }
        SurveyController.prototype.init = function () {
            this.surveyType = 1;
            this.currentStep = 1;
            this.visibleNext = true;
            this.visiblePrev = false;
            this.visibleFinish = false;
            this.porcentage = 0;
            this.sliderOptions = {
                floor: 0,
                ceil: 25,
                translate: function (value) {
                    return value + " %";
                }
            };
            this.populateMarketOptions();
            this.populateCategories();
            this.propertyTypeOptions = new Array();
            this.propertyTypeOptions.push('Sited', 'Non-Sited', 'Mixed Sited and Non-Sited');
            this.userInfo = this.surveyType == 1 ? new survey.ManagerInfo() : new survey.AdminInfo();
        };
        SurveyController.prototype.populateMarketOptions = function () {
            var controller = this;
            this.surveyService.resolveMarketStates().then(function (response) {
                controller.marketOptions = response.RestResponse.result;
            });
        };
        SurveyController.prototype.populateCategories = function () {
            /*let controller = this;
            this.surveyService.resolveCategories().then(response => {
                controller.categories = response;
            });*/
            this.categories = new Array();
            for (var i = 1; i < 20; i++) {
                this.categories.push(new survey.Category(i, "Activity Name not Required " + i, "This is the job activity that we need to do" + i));
            }
        };
        //Events
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