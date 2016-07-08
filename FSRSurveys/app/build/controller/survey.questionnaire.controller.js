var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var QuestionnaireController = (function (_super) {
        __extends(QuestionnaireController, _super);
        function QuestionnaireController($scope, surveyService) {
            _super.call(this, $scope, surveyService);
            this.init();
        }
        QuestionnaireController.prototype.init = function () {
            this.$scope.percentage = 35;
            this.sliderOptions = {
                floor: 0,
                ceil: 25,
                step: 1,
                translate: function (value) {
                    return value + " %";
                }
            };
            this.activityOwnerOptions = ['Manager', 'Admin', 'Other', 'N/A'];
            this.activityPerformedOptions = ['Manual', 'Electronic', 'Email', 'N/A'];
            this.populateQuestionnaire();
            this.setupWatchers();
        };
        QuestionnaireController.prototype.populateQuestionnaire = function () {
            var controller = this;
            controller.questionnaireData = new Array();
            this.surveyService.resolveCategories().then(function (response) {
                var categories = response;
                for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
                    var category = categories_1[_i];
                    controller.questionnaireData.push(new survey.QuestionnaireItem(category, new survey.Answer()));
                }
            });
        };
        QuestionnaireController.prototype.setupWatchers = function () {
            var _this = this;
            this.$scope.$watch(function () { return _this.$scope.percentage; }, function (newValue, oldValue) {
                _this.updatePercentage(newValue, oldValue);
            }, true);
        };
        QuestionnaireController.prototype.updatePercentage = function (oldValue, newValue) {
            if (oldValue !== newValue) {
                console.log("This is the new value " + newValue);
            }
        };
        QuestionnaireController.prototype.addQuestionnaireItemClick = function () {
            this.questionnaireData.push(new survey.QuestionnaireItem(new survey.Category(0, "Other", ""), new survey.Answer()));
            //TODO create an Angular Directive for this
            setTimeout(function () {
                $("textarea.no-border:last").focus();
            }, 500);
        };
        QuestionnaireController.prototype.closeOtherClick = function (index) {
            this.questionnaireData.splice(index, 1);
        };
        return QuestionnaireController;
    }(survey.AbstractController));
    angular.module("survey")
        .controller("QuestionnaireController", QuestionnaireController);
})(survey || (survey = {}));
//# sourceMappingURL=survey.questionnaire.controller.js.map