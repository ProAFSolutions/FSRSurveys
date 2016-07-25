namespace survey {

    class UserController extends AbstractController {  


        public marketSelected: Market;
        public marketsOptions: Array<Market>;
        public propertyTypeOptions: Array<string>;      
        public associateType: any;
        public associateOptions: Array<any>;
        public emailExists = false;
       

        constructor($scope: ng.IScope, dataContext: DataContext, surveyService: SurveyService) {
            super($scope, dataContext, surveyService);
            this.init();
        }

        private init(): void {            
            this.propertyTypeOptions = ['Sited', 'Non-Sited', 'Mix of Sited and Non-Sited'];            

            this.associateOptions = [
                {
                    name: 'Property Manager',
                    value: 'Manager'
                },
                {
                    name: 'Assistant Manager',
                    value: 'Assistant'
                },
                {
                    name: 'Property Administrator',
                    value: 'Administrator'
                }                
            ];  

            this.associateType = this.associateOptions[0];

            this.dataContext.userInfo = new ManagerInfo();
            this.dataContext.userInfo.associateType = this.associateType.value;
            this.populateMarkets();
            this.setupWatchers();
        } 

        private setupWatchers(): void{
            var currentController = this;

            this.$scope.$watch(() => this.associateType, (newValue: any, oldValue: any) => {
                if (newValue.value != oldValue.value) {
                    if (newValue.value === 'Manager') {
                        var managerInfo = new ManagerInfo();
                        managerInfo.associateType = 'Manager';
                        managerInfo.copyFrom(this.dataContext.userInfo);
                        this.dataContext.userInfo = managerInfo;
                    }
                    else if (newValue.value === 'Administrator') {
                        var adminInfo = new AdminInfo();
                        adminInfo.associateType = 'Administrator';
                        adminInfo.copyFrom(this.dataContext.userInfo);
                        this.dataContext.userInfo = adminInfo;
                    }
                    else {
                        var assistantInfo = new AssistantInfo();
                        assistantInfo.associateType = 'Assistant';
                        assistantInfo.copyFrom(this.dataContext.userInfo);
                        this.dataContext.userInfo = assistantInfo;
                    }
                }
            }, true);

            this.$scope.$watch(() => this.marketSelected, (newValue: Market, oldValue: Market) => {
                if (newValue != oldValue) {
                    currentController.dataContext.userInfo.marketName = newValue.name;
                }
            });            
        }

        private populateMarkets() {

            this.marketsOptions = new Array<Market>();

            for (var state of this.getStates()) {
                this.marketsOptions.push(new Market(state, "US"));
            }

            for (var province of this.getProvinces()) {
                this.marketsOptions.push(new Market(province, "CANADA"));
            }
        }

        private getProvinces(): Array<string> {
            return [
                'Alberta', 'British Columbia', 'Manitoba', 'New Brunswick', 'Newfoundland Nova Scotia', 'Ontario',
                'Prince Edward Island', 'Quebec', 'Saskatchewan'
            ];
        }

        private getStates(): Array<string> {
            return [
                'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
                'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
                'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania',
                'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
            ];
        }

        public invalidNumberInput(value: number): boolean{
            return !value && value <= 0; 
        }       


        public checkUser(): void {
            let controller = this;
            if (this.dataContext.userInfo.email) {
                this.surveyService.checkUser(this.dataContext.userInfo.email).then(response => {
                    controller.emailExists = response && response === true;                   
                });
            } else {
                this.emailExists = false;
                this.dataContext.userInfo.recoveryPassword = '';
            }            
        }

        public reloadDataClick(): void{
            if (confirm("Do you confirm you want to reload your information ?")) {
                this.surveyService.getQuestionnaireData(this.dataContext.userInfo.email, this.dataContext.userInfo.recoveryPassword).then(response => {
                    if (response && response.items.length > 0) {
                        this.dataContext.userInfo = response.managerInfo ? response.managerInfo : response.adminInfo ? response.adminInfo : response.assistantInfo;
                        this.dataContext.questionnaireData = response.items;
                    } else {
                        alert("Sorry, your recovery password does not match our records, please try again, otherwise you won't be able to use the entered email address");
                        this.dataContext.userInfo.recoveryPassword = '';
                    }
                });
            }
        }

       
    }

    angular.module("survey")
           .controller("UserController", UserController);
}