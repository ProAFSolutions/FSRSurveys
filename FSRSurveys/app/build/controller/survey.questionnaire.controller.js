var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var QuestionnaireController = (function (_super) {
        __extends(QuestionnaireController, _super);
        function QuestionnaireController($scope, cache, surveyService) {
            _super.call(this, $scope, cache, surveyService);
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
            this.percentageTimeEffortOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50];
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
            var _this = this;
            this.questionnaireData = new Array();
            this.surveyService.resolveCategories().then(function (response) {
                var categories = response;
                for (var _i = 0, categories_1 = categories; _i < categories_1.length; _i++) {
                    var category = categories_1[_i];
                    _this.questionnaireData.push(new survey.QuestionnaireItem(category, new survey.Answer()));
                }
                _this.questionnaireData.push(new survey.QuestionnaireItem(new survey.Category(0, "Other", ""), new survey.Answer()));
            });
        };
        QuestionnaireController.prototype.calculateTotals = function () {
            var _this = this;
            var currentController = this;
            this.$scope.$watch(function () { return _this.questionnaireData; }, function (newValue, oldValue) {
                currentController.initTotals();
                for (var _i = 0, newValue_1 = newValue; _i < newValue_1.length; _i++) {
                    var questionnaireItem = newValue_1[_i];
                    currentController.percentageTimeEffort += questionnaireItem.answer.timeEffort;
                    if (questionnaireItem.answer.activityOwner) {
                        currentController.totalActivityOwner++;
                    }
                    if (questionnaireItem.answer.activityPerformed) {
                        currentController.totalActivityPerformed++;
                    }
                    if (questionnaireItem.answer.technology) {
                        currentController.totalTechnology++;
                    }
                }
            }, true);
            this.$scope.$watch(function () { return _this.percentageTimeEffort; }, function (newValue, oldValue) {
                currentController.validateQuestionnaire();
            });
            this.$scope.$watch(function () { return _this.totalActivityOwner; }, function (newValue, oldValue) {
                currentController.validateQuestionnaire();
            });
            this.$scope.$watch(function () { return _this.totalActivityPerformed; }, function (newValue, oldValue) {
                currentController.validateQuestionnaire();
            });
            this.$scope.$watch(function () { return _this.totalTechnology; }, function (newValue, oldValue) {
                currentController.validateQuestionnaire();
            });
        };
        QuestionnaireController.prototype.validateQuestionnaire = function () {
            var totalItems = this.questionnaireData.length;
            this.cache.sumbitBtnDisabled = this.percentageTimeEffort == 100 &&
                this.totalActivityOwner == totalItems &&
                this.totalActivityPerformed == totalItems &&
                this.totalTechnology == totalItems;
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