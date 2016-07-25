var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var QuestionnaireController = (function (_super) {
        __extends(QuestionnaireController, _super);
        function QuestionnaireController($scope, dataContext, surveyService) {
            _super.call(this, $scope, dataContext, surveyService);
            this.firstTime = true;
            this.init();
        }
        QuestionnaireController.prototype.init = function () {
            this.initTotals();
            this.percentageTimeEffortOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100];
            this.activityOwnerOptions = ['Manager', 'Admin', 'Accounting', 'Asst Mgr', 'Other', 'N/A'];
            this.activityPerformedOptions = ['Yes', 'No', 'N/A'];
            this.calculateTotals();
        };
        QuestionnaireController.prototype.initTotals = function () {
            this.percentageTimeEffort = 0;
            this.totalActivityOwner = 0;
            this.totalActivityPerformed = 0;
            this.totalTechnology = 0;
        };
        QuestionnaireController.prototype.calculateTotals = function () {
            var _this = this;
            var currentController = this;
            this.$scope.$watch(function () { return _this.dataContext.questionnaireData; }, function (newValue, oldValue) {
                currentController.initTotals();
                var index = 0;
                for (var _i = 0, newValue_1 = newValue; _i < newValue_1.length; _i++) {
                    var questionnaireItem = newValue_1[_i];
                    if (questionnaireItem.answer.timeEffort >= 0) {
                        var oldTimeEffort = oldValue[index].answer.timeEffort;
                        if (questionnaireItem.answer.timeEffort != oldTimeEffort && questionnaireItem.answer.timeEffort == 0) {
                            questionnaireItem.answer.activityOwner = 'N/A';
                            questionnaireItem.answer.activityPerformed = 'N/A';
                            questionnaireItem.answer.technology = 'N/A';
                        }
                        currentController.percentageTimeEffort += questionnaireItem.answer.timeEffort;
                    }
                    if (questionnaireItem.answer.activityOwner) {
                        currentController.totalActivityOwner++;
                    }
                    if (questionnaireItem.answer.activityPerformed) {
                        currentController.totalActivityPerformed++;
                    }
                    index++;
                }
            }, true);
            this.$scope.$watch(function () { return _this.percentageTimeEffort; }, function (newValue, oldValue) {
                if (newValue != oldValue) {
                    currentController.validateQuestionnaire();
                    if (newValue == 100) {
                        for (var _i = 0, _a = _this.dataContext.questionnaireData; _i < _a.length; _i++) {
                            var questionnaireItem = _a[_i];
                            if (!questionnaireItem.answer.timeEffort) {
                                questionnaireItem.answer.timeEffort = 0;
                            }
                        }
                    }
                }
            });
            this.$scope.$watch(function () { return _this.totalActivityOwner; }, function (newValue, oldValue) {
                if (newValue != oldValue)
                    currentController.validateQuestionnaire();
            });
            this.$scope.$watch(function () { return _this.totalActivityPerformed; }, function (newValue, oldValue) {
                if (newValue != oldValue)
                    currentController.validateQuestionnaire();
            });
            this.$scope.$watch(function () { return _this.totalTechnology; }, function (newValue, oldValue) {
                if (newValue != oldValue)
                    currentController.validateQuestionnaire();
            });
        };
        QuestionnaireController.prototype.validateQuestionnaire = function () {
            this.checkIfDirty();
            var totalItems = this.dataContext.questionnaireData.length;
            this.dataContext.sumbitBtnDisabled = !(this.percentageTimeEffort == 100 &&
                this.totalActivityOwner == totalItems &&
                this.totalActivityPerformed == totalItems);
        };
        QuestionnaireController.prototype.checkIfDirty = function () {
            this.dataContext.isSurveyDirty = this.percentageTimeEffort > 0 || this.totalActivityOwner > 0 ||
                this.totalActivityPerformed > 0 || this.totalTechnology > 0;
        };
        QuestionnaireController.prototype.closeOtherClick = function (index) {
            this.dataContext.questionnaireData.splice(index, 1);
        };
        return QuestionnaireController;
    }(survey.AbstractController));
    angular.module("survey")
        .controller("QuestionnaireController", QuestionnaireController);
})(survey || (survey = {}));
