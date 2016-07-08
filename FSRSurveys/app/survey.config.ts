
///<reference path="../node_modules/definitely-typed-angular/angular.d.ts" />
///<reference path="../node_modules/definitely-typed-angular/angular-resource.d.ts" />
///<reference path="../node_modules/definitely-typed-angular-ui-bootstrap/angular-ui-bootstrap.d.ts" />
///<reference path="../node_modules/definitely-typed-angular-ui-router/angular-ui-router.d.ts" />
///<reference path="../node_modules/definitely-typed-jquery/jquery.d.ts" />
namespace survey {
    
    function init($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise("");

        $stateProvider
            .state("root", {
                url: '',
                views: {
                    "menu": {
                        templateUrl: 'app/html/survey.menu.html'
                    },
                    "container": {
                        templateUrl: 'app/html/survey.wizard.html'                       
                    }
                }
            });
    }; 

    angular.module("survey", [
        "ui.bootstrap",
        "ngResource",
        "ui.router",
        "rzModule",
        'ngSanitize',
        'ui.select',
        'ngMessages'
    ]).config(init);
}