var survey;
(function (survey) {
    var SharedDataService = (function () {
        function SharedDataService() {
        }
        return SharedDataService;
    }());
    survey.SharedDataService = SharedDataService;
    angular.module("survey").service("SharedDataService", SharedDataService);
})(survey || (survey = {}));
//# sourceMappingURL=survey.sharedData.service.js.map