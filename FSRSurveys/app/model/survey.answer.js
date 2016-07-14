var survey;
(function (survey) {
    var Answer = (function () {
        function Answer() {
            this.timeEffort = 0;
            this.activityOwner = "";
            this.activityPerformed = "";
            this.technology = "";
        }
        return Answer;
    }());
    survey.Answer = Answer;
})(survey || (survey = {}));
