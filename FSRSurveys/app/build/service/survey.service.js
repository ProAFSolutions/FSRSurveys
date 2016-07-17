var survey;
(function (survey) {
    //const SURVEY_API_BASE_URL = "http://localhost:23611/api/survey";  
    var SURVEY_API_BASE_URL = "http://rolesurvey.fsresidential.com/api/api/survey";
    var SurveyService = (function () {
        function SurveyService($httpService) {
            this.$http = $httpService;
        }
        SurveyService.prototype.saveSurvey = function (userInfo, items) {
            //return this.$http.post(SURVEY_API_BASE_URL + "/save", { userInfo: userInfo, items: items }).then(response => response.data);
            return this.$http({
                url: SURVEY_API_BASE_URL + "/save",
                method: 'POST',
                data: { userInfo: userInfo, items: items },
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(function (response) { return response.data; });
        };
        SurveyService.prototype.resolveCategories = function () {
            return this.$http.get(SURVEY_API_BASE_URL + "/categories").then(function (response) { return response.data; });
        };
        SurveyService.prototype.resolveMarkets = function () {
            return this.$http.get(SURVEY_API_BASE_URL + "/markets").then(function (response) { return response.data; });
        };
        SurveyService.$inject = ["$http"];
        return SurveyService;
    }());
    survey.SurveyService = SurveyService;
    angular.module("survey").service("SurveyService", SurveyService);
})(survey || (survey = {}));
//# sourceMappingURL=survey.service.js.map