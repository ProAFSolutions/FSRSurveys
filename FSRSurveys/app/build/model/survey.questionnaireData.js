var survey;
(function (survey) {
    var QuestionnaireData = (function () {
        function QuestionnaireData(userInfo, items) {
            this.userInfo = userInfo;
            this.items = items;
        }
        return QuestionnaireData;
    }());
    survey.QuestionnaireData = QuestionnaireData;
})(survey || (survey = {}));
//# sourceMappingURL=survey.questionnaireData.js.map