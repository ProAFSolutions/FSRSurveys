namespace survey {

    class UserController extends AbstractController {  
               
        public userInfo: any;
        public marketOptions: Array<any>;
        public propertyTypeOptions: Array<string>;

        constructor($scope: ng.IScope, surveyService: SurveyService) {
            super($scope, surveyService);
            this.init();
        }

        private init(): void {
            this.userInfo = this.$scope.surveyType == 1 ? new ManagerInfo() : new AdminInfo();
            this.propertyTypeOptions = ['Sited', 'Non-Sited', 'Mixed Sited and Non-Sited']; 
            this.populateMarketOptions();        
        }

        private populateMarketOptions(): void {
            let controller = this;
            this.surveyService.resolveMarketStates().then(response => {
                controller.marketOptions = response.RestResponse.result;
            });
        }        
    }

    angular.module("survey")
           .controller("UserController", UserController);
}