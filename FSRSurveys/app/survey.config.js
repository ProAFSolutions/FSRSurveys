var survey;
(function (survey) {
    function init($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("");
        $stateProvider
            .state("root", {
            url: '',
            views: {
                "menu": {
                    templateUrl: 'app/views/survey.menu.html'
                },
                "container": {
                    templateUrl: 'app/views/survey.wizard.html'
                }
            }
        });
    }
    ;
    angular.module("survey", [
        "ui.bootstrap",
        "ui.router",
        'ngSanitize',
        'ui.select',
        'ngMessages'
    ]).config(init);
})(survey || (survey = {}));
