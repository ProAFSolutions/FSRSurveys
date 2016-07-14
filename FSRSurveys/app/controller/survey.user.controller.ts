namespace survey {

    class UserController extends AbstractController {  

        
        public marketOptions: Array<Market>;
        public propertyTypeOptions: Array<string>;
        public associateType: string;

        constructor($scope: ng.IScope, dataContext: DataContext, surveyService: SurveyService) {
            super($scope, dataContext, surveyService);
            this.init();
        }

        private init(): void {
            this.dataContext.userInfo = this.$scope.surveyType == 1 ? new ManagerInfo() : new AdminInfo();
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