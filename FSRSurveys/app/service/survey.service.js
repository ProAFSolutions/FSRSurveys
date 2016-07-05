var survey;
(function (survey) {
    var service;
    (function (service) {
        var SurveyService = (function () {
            function SurveyService() {
            }
            return SurveyService;
        }());
        service.SurveyService = SurveyService;
        angular.module("survey").service("surveyService", SurveyService);
    })(service = survey.service || (survey.service = {}));
})(survey || (survey = {}));
//# sourceMappingURL=survey.service.js.map