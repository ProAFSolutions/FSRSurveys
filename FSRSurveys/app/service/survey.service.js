var survey;
(function (survey) {
    var SURVEY_API_BASE_URL = "http://localhost:23611/api/survey";
    var SurveyService = (function () {
        function SurveyService($httpService) {
            this.$http = $httpService;
        }
        SurveyService.prototype.getQuestionnaireData = function (email, password) {
            return this.$http.get(SURVEY_API_BASE_URL + "/questionnaire-data/" + email + "/" + password).then(function (response) { return response.data; });
        };
        SurveyService.prototype.saveSurvey = function (userInfo, items) {
            var questionnaireData = new survey.QuestionnaireData();
            questionnaireData.items = items;
            if (userInfo.associateType === 'Manager')
                questionnaireData.managerInfo = userInfo;
            else if (userInfo.associateType === 'Administrator')
                questionnaireData.adminInfo = userInfo;
            else
                questionnaireData.assistantInfo = userInfo;
            return this.$http.post(SURVEY_API_BASE_URL + "/save", questionnaireData).then(function (response) { return response.data; });
        };
        SurveyService.prototype.resolveCategories = function () {
            return this.$http.get(SURVEY_API_BASE_URL + "/categories").then(function (response) { return response.data; });
        };
        SurveyService.prototype.checkUser = function (email) {
            return this.$http.get(SURVEY_API_BASE_URL + "/check/" + email).then(function (response) { return response.data; });
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
