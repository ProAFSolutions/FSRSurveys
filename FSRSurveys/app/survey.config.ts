///<reference path="../node_modules/definitely-typed-angular/angular.d.ts" />
///<reference path="../node_modules/definitely-typed-angular/angular-resource.d.ts" />
///<reference path="../node_modules/definitely-typed-angular-ui-router/angular-ui-router.d.ts" />
///<reference path="../node_modules/definitely-typed-jquery/jquery.d.ts" />

module survey {
    
    function configure($stateProvider: angular.ui.IStateProvider, $urlRouterProvider: angular.ui.IUrlRouterProvider) {
        $urlRouterProvider.otherwise("");

        $stateProvider
            .state("root", {
                url: '',   
                abstract: true,         
                views: {
                    "top-menu": {
                        templateUrl: 'app/components/top-menu.html'
                    }
                }
            }).state("root.manager", {
                url: '/survey-manager',
                views: {
                    'container@': {
                        templateUrl: 'app/manager/manager.html',
                        controller: "ManagerController as vm"
                    }
                }
            })
    }; 

    angular.module("survey", ["ngResource", "ui.router"])
           .config(configure);
}