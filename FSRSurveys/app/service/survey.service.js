var survey;
(function (survey) {
    var SURVEY_API_BASE_URL = "http://localhost:61326/api/survey";
    var STATES_REST_URL = "http://services.groupkt.com/state/get/usa/all";
    var SurveyService = (function () {
        function SurveyService($resource) {
            this.$resource = $resource;
        }
        SurveyService.prototype.save = function (userInfo, category) {
        };
        SurveyService.prototype.resolveMarketStates = function () {
        };
        SurveyService.$inject = ["$resource"];
        return SurveyService;
    }());
    survey.SurveyService = SurveyService;
    angular.module("survey").service("SurveyService", SurveyService);
})(survey || (survey = {}));
//# sourceMappingURL=survey.service.js.map