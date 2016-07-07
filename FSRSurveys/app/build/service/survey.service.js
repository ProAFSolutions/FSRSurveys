var survey;
(function (survey) {
    var SURVEY_API_BASE_URL = "http://localhost:23611/api/survey";
    var STATES_REST_URL = "http://services.groupkt.com/state/get/usa/all";
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
            return null; // return this.$http.get(SURVEY_API_BASE_URL + "/categories").then(response => response.data);                  
        };
        SurveyService.prototype.resolveMarketStates = function () {
            return this.$http.get(STATES_REST_URL).then(function (response) { return response.data; });
        };
        SurveyService.$inject = ["$q", "$http"];
        return SurveyService;
    }());
    survey.SurveyService = SurveyService;
    angular.module("survey").service("SurveyService", SurveyService);
})(survey || (survey = {}));
//# sourceMappingURL=survey.service.js.map