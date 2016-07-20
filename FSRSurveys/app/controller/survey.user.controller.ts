namespace survey {

    class UserController extends AbstractController {  

        
        public marketOptions: Array<string>;
        public propertyTypeOptions: Array<string>;
        public cityOptions: Array<string>;
        public associateType: string;
       

        constructor($scope: ng.IScope, dataContext: DataContext, surveyService: SurveyService) {
            super($scope, dataContext, surveyService);
            this.init();
        }

        private init(): void {            
            this.propertyTypeOptions = ['Sited', 'Non-Sited', 'Mixed of Sited and Non-Sited'];
            this.cityOptions = ['Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland Nova Scotia', 'Ontario', 'Prince Edward Island', 'Quebec', 'Saskatchewan'];
            this.marketOptions = [
                'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
                'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
                'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
                'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

            this.watchAssociateType();

            this.associateType = "Manager";
            this.dataContext.userInfo = new ManagerInfo();
            this.watchAssociateType();
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

        public checkUser(): void {
            let controller = this;
            if (this.dataContext.userInfo.email) {
                this.surveyService.getQuestionnaireData(this.dataContext.userInfo.email).then(response => {
                    if (response === 'empty')
                        return;

                    if (confirm("The system has detected a previous information associated to your email. Do you want to load it?")) {
                        this.dataContext.userInfo = response.managerInfo != null ? response.managerInfo : response.adminInfo
                        this.dataContext.questionnaireData = response.items;                       
                    }
                });
            }            
        }

         /*private populateMarketOptions(): void {
            let controller = this;
            this.surveyService.resolveMarkets().then(response => {
                controller.marketOptions = new Array<string>();
                for (var market of response) {
                    controller.marketOptions.push(market.name);
                }
            });
        }  */
        
    }

    angular.module("survey")
           .controller("UserController", UserController);
}