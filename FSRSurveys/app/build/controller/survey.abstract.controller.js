var survey;
(function (survey) {
    var AbstractController = (function () {
        function AbstractController($scope, surveyService) {
            this.$scope = $scope;
            this.surveyService = surveyService;
        }
        AbstractController.$inject = ["$scope", "SurveyService"];
        return AbstractController;
    }());
    survey.AbstractController = AbstractController;
})(survey || (survey = {}));
//# sourceMappingURL=survey.abstract.controller.js.map