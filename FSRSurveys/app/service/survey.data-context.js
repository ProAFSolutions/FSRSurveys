var survey;
(function (survey) {
    var DataContext = (function () {
        function DataContext() {
            this.sumbitBtnDisabled = true;
        }
        return DataContext;
    }());
    survey.DataContext = DataContext;
    angular.module("survey").service("DataContext", DataContext);
})(survey || (survey = {}));
