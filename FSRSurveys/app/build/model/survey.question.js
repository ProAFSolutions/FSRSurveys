var survey;
(function (survey) {
    var Question = (function () {
        function Question(category, answer) {
            this.category = category;
            this.answer = answer;
        }
        return Question;
    }());
    survey.Question = Question;
})(survey || (survey = {}));
//# sourceMappingURL=survey.question.js.map