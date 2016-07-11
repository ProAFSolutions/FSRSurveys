namespace survey {

    class UserController extends AbstractController {  

        
        public userInfo: any;
        public marketOptions: Array<Market>;
        public propertyTypeOptions: Array<string>;
        public associateType: string;

        constructor($scope: ng.IScope, cache: SurveyCache, surveyService: SurveyService) {
            super($scope, cache, surveyService);
            this.init();
        }

        private init(): void {
            this.userInfo = this.$scope.surveyType == 1 ? new ManagerInfo() : new AdminInfo();
            this.propertyTypeOptions = ['Sited', 'Non-Sited', 'Mixed Sited and Non-Sited'];

            this.associateType = "Manager";
            this.populateMarketOptions();        
        }

        private populateMarketOptions(): void {
            let controller = this;
            this.surveyService.resolveMarkets().then(response => {
                controller.marketOptions = response;
            });
        }       
    }

    angular.module("survey")
           .controller("UserController", UserController);
}