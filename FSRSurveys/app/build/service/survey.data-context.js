var survey;
(function (survey) {
    var DataContext = (function () {
        function DataContext() {
            this.isRunningMobile = false;
            this.sumbitBtnDisabled = true;
            this.questionnaireData = new Array();
        }
        return DataContext;
    }());
    survey.DataContext = DataContext;
    angular.module("survey").service("DataContext", DataContext);
})(survey || (survey = {}));
//# sourceMappingURL=survey.data-context.js.map