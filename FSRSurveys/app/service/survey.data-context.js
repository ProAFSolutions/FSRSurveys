var survey;
(function (survey) {
    var DataContext = (function () {
        function DataContext() {
            this.isRunningMobile = false;
            this.sumbitBtnDisabled = true;
            this.questionnaireData = new Array();
            this.isSurveyDirty = false;
        }
        return DataContext;
    }());
    survey.DataContext = DataContext;
    angular.module("survey").service("DataContext", DataContext);
})(survey || (survey = {}));
