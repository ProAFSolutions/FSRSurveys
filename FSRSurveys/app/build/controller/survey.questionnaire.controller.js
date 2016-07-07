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
            this.sliderOptions = {
                floor: 0,
                ceil: 25,
                translate: function (value) {
                    return value + " %";
                }
            };
            this.activityOwnerOptions = ['Manager', 'Admin', 'Other', 'N/A'];
            this.activityPerformedOptions = ['Manual', 'Electronic', 'Email', 'N/A'];
            this.populateQuestionnaire();
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
            /*this.categories = new Array<Category>();
            for (var i = 1; i < 20; i++) {
                this.categories.push(new Category(i, "Activity Name not Required " + i, "This is the job activity that we need to do" + i));
            }*/
        };
        QuestionnaireController.prototype.addQuestionnaireItemClick = function () {
            this.questionnaireData.push(new survey.QuestionnaireItem(new survey.Category(0, "Other", ""), new survey.Answer()));
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