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
            this.initTotals();
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
            this.calculateTotals();
        };
        QuestionnaireController.prototype.initTotals = function () {
            this.percentageTimeEffort = 0;
            this.totalActivityOwner = 0;
            this.totalActivityPerformed = 0;
            this.totalTechnology = 0;
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
        QuestionnaireController.prototype.calculateTotals = function () {
            var _this = this;
            var overflowedIndex = -1;
            var prevOverflowedValue = 0;
            this.$scope.$watch(function () { return _this.questionnaireData; }, function (newValue, oldValue) {
                _this.initTotals();
                for (var i = 0; i < newValue.length; i++) {
                    var questionnaireItem = newValue[i];
                    if ((_this.percentageTimeEffort + questionnaireItem.answer.timeEffort) <= 100) {
                        _this.percentageTimeEffort += questionnaireItem.answer.timeEffort;
                    }
                    else {
                        overflowedIndex = i;
                        prevOverflowedValue = oldValue[overflowedIndex].answer.timeEffort;
                        break;
                    }
                    if (questionnaireItem.answer.activityOwner) {
                        _this.totalActivityOwner++;
                    }
                    if (questionnaireItem.answer.activityPerformed) {
                        _this.totalActivityPerformed++;
                    }
                    if (questionnaireItem.answer.technology) {
                        _this.totalTechnology++;
                    }
                }
            }, true);
            if (overflowedIndex > -1) {
                alert("Time effort exceeds 100%. Please, adjust the answers with the proper values");
                this.questionnaireData[overflowedIndex].answer.timeEffort = prevOverflowedValue;
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
    var WarnDialogController = (function () {
        function WarnDialogController() {
        }
        return WarnDialogController;
    }());
    angular.module("survey")
        .controller("QuestionnaireController", QuestionnaireController);
})(survey || (survey = {}));
//# sourceMappingURL=survey.questionnaire.controller.js.map