var survey;
(function (survey) {
    var QuestionItem = (function () {
        function QuestionItem(category, answer) {
            this.category = category;
            this.answer = answer;
        }
        return QuestionItem;
    }());
    survey.QuestionItem = QuestionItem;
})(survey || (survey = {}));
//# sourceMappingURL=survey.question-item.js.map