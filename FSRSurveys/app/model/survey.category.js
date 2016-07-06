var survey;
(function (survey) {
    var Category = (function () {
        function Category(name, jobActivity, timeEffort, activityOwner, activityPerformed, technology) {
            this.name = name;
            this.jobActivity = jobActivity;
            this.timeEffort = timeEffort;
            this.activityOwner = activityOwner;
            this.activityPerformed = activityPerformed;
            this.technology = technology;
        }
        return Category;
    }());
    survey.Category = Category;
})(survey || (survey = {}));
//# sourceMappingURL=survey.category.js.map