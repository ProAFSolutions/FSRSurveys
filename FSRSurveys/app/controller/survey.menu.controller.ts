namespace survey {

    class MenuController extends AbstractController { 
        public isCollapsed = true;

        constructor($scope: ng.IScope, dataContext: DataContext, surveyService: SurveyService) {
            super($scope, dataContext, surveyService);
            this.init();
        }

        private init(): void {
            let controller = this;
            this.$scope.$watch(() => this.dataContext.isRunningMobile, (newValue: boolean, oldValue: boolean) => {
                controller.isCollapsed = true;               
            });
        }

        public toogleClick(): void {
            this.isCollapsed = !this.isCollapsed;
        }
        
    }

    angular.module("survey")
           .controller("MenuController", MenuController);
}