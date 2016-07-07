var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var QuestionaireController = (function (_super) {
        __extends(QuestionaireController, _super);
        function QuestionaireController($scope, surveyService) {
            _super.call(this, $scope, surveyService);
            this.init();
        }
        QuestionaireController.prototype.init = function () {
            this.sliderOptions = {
                floor: 0,
                ceil: 25,
                translate: function (value) {
                    return value + " %";
                }
            };
            this.activityOwnerOptions = ['Manager', 'Admin', 'Other', 'N/A'];
            this.activityPerformedOptions = ['Manual', 'Electronic', 'Email', 'N/A'];
            this.populateCategories();
        };
        QuestionaireController.prototype.populateCategories = function () {
            var controller = this;
            this.surveyService.resolveCategories().then(function (response) {
                controller.categories = response;
            });
            /*this.categories = new Array<Category>();
            for (var i = 1; i < 20; i++) {
                this.categories.push(new Category(i, "Activity Name not Required " + i, "This is the job activity that we need to do" + i));
            }*/
        };
        QuestionaireController.prototype.addCategoryClick = function () {
            this.categories.push(new survey.Category(0, "Other", "This is the job activity that we need to do"));
        };
        QuestionaireController.prototype.closeOtherClick = function (index) {
            this.categories.splice(index, 1);
        };
        return QuestionaireController;
    }(survey.AbstractController));
    angular.module("survey")
        .controller("QuestionaireController", QuestionaireController);
})(survey || (survey = {}));
//# sourceMappingURL=survey.questionaire.controller.js.map