var survey;
(function (survey) {
    var AbstractController = (function () {
        function AbstractController($scope, cache, surveyService) {
            this.$scope = $scope;
            this.cache = cache;
            this.surveyService = surveyService;
        }
        AbstractController.$inject = ["$scope", "SurveyCache", "SurveyService"];
        return AbstractController;
    }());
    survey.AbstractController = AbstractController;
})(survey || (survey = {}));
//# sourceMappingURL=survey.abstract.controller.js.map