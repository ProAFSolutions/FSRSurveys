var survey;
(function (survey) {
    var AbstractController = (function () {
        function AbstractController($scope, dataContext, surveyService) {
            this.$scope = $scope;
            this.dataContext = dataContext;
            this.surveyService = surveyService;
        }
        AbstractController.$inject = ["$scope", "DataContext", "SurveyService"];
        return AbstractController;
    }());
    survey.AbstractController = AbstractController;
})(survey || (survey = {}));
