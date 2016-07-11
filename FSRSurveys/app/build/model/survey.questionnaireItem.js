var survey;
(function (survey) {
    var QuestionnaireItem = (function () {
        function QuestionnaireItem(category, answer) {
            this.category = category;
            this.answer = answer;
        }
        return QuestionnaireItem;
    }());
    survey.QuestionnaireItem = QuestionnaireItem;
})(survey || (survey = {}));
//# sourceMappingURL=survey.questionnaireItem.js.map