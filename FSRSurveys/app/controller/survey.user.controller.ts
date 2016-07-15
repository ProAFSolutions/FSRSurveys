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
            this.propertyTypeOptions = ['Sited', 'Non-Sited', 'Mixed Sited and Non-Sited'];

            this.watchAssociateType();

            this.associateType = "Manager";
            this.dataContext.userInfo = new ManagerInfo();
            this.watchAssociateType();

            this.populateMarketOptions();        
        }

        private populateMarketOptions(): void {
            let controller = this;
            this.surveyService.resolveMarkets().then(response => {
                controller.marketOptions = response;
            });
        }   

        public watchAssociateType(): void {

            var currentController = this;

            this.$scope.$watch(() => this.associateType, (newValue: string, oldValue: string) => {

                if (newValue != oldValue) {

                    if (newValue === 'Manager') {
                        var managerInfo = new ManagerInfo();
                        managerInfo.copyFrom(this.dataContext.userInfo);
                        this.dataContext.userInfo = managerInfo;
                    }
                    else {
                        var adminInfo = new AdminInfo();
                        adminInfo.copyFrom(this.dataContext.userInfo);
                        this.dataContext.userInfo = adminInfo;
                    }
                }
            });
        }
        
    }

    angular.module("survey")
           .controller("UserController", UserController);
}