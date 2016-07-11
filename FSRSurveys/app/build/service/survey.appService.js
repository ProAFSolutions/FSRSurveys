var survey;
(function (survey) {
    var SURVEY_API_BASE_URL = "http://rolesurvey.fsresidential.com/api/api/survey";
    var SurveyService = (function () {
        function SurveyService($q, $httpService) {
            this.$q = $q;
            this.$http = $httpService;
        }
        SurveyService.prototype.saveManagerSurvey = function (userInfo, categories) {
        };
        SurveyService.prototype.saveAdminSurvey = function (userInfo, categories) {
        };
        SurveyService.prototype.resolveCategories = function () {
            return this.$http.get(SURVEY_API_BASE_URL + "/categories").then(function (response) { return response.data; });
        };
        SurveyService.prototype.resolveMarkets = function () {
            return this.$http.get(SURVEY_API_BASE_URL + "/markets").then(function (response) { return response.data; });
        };
        SurveyService.$inject = ["$q", "$http"];
        return SurveyService;
    }());
    survey.SurveyService = SurveyService;
    angular.module("survey").service("SurveyService", SurveyService);
})(survey || (survey = {}));
//# sourceMappingURL=survey.appService.js.map