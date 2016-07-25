///<reference path="../node_modules/definitely-typed-angular/angular.d.ts" />
///<reference path="../node_modules/definitely-typed-angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../node_modules/definitely-typed-angular-ui-router/angular-ui-router.d.ts" />
///<reference path="../node_modules/definitely-typed-jquery/jquery.d.ts" />
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
//# sourceMappingURL=survey.config.js.map