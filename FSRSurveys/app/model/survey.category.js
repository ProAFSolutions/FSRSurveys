var survey;
(function (survey) {
    var Category = (function () {
        function Category(id, name, jobActivity) {
            this.id = id;
            this.name = name;
            this.jobActivity = jobActivity;
        }
        return Category;
    }());
    survey.Category = Category;
})(survey || (survey = {}));
