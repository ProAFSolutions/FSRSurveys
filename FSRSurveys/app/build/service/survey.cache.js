var survey;
(function (survey) {
    var SurveyCache = (function () {
        function SurveyCache() {
            this.sumbitBtnDisabled = true;
        }
        return SurveyCache;
    }());
    survey.SurveyCache = SurveyCache;
    angular.module("survey").service("SurveyCache", SurveyCache);
})(survey || (survey = {}));
//# sourceMappingURL=survey.cache.js.map