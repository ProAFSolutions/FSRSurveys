namespace survey {

    class WizardController extends AbstractController { 
                
        public currentStep: number;
        public visibleNext: boolean;
        public visiblePrev: boolean;
        public visibleFinish: boolean;
        public porcentage: number; 
               

        constructor($scope: ng.IScope, surveyService: SurveyService) {
            super($scope, surveyService);
            this.init();
        }
                                                           
        private init(): void
        {
            this.$scope.surveyType = 1;

            this.currentStep = 1;
            this.visibleNext = true;
            this.visiblePrev = false;
            this.visibleFinish = false;
            this.porcentage = 0;                 
        } 

        //Events
        private nextClick(): void {
            ++this.currentStep;
            if (this.currentStep > 1) {
                this.visiblePrev = true;
                if (this.currentStep == 3) {
                    this.visibleNext = false;
                    this.visibleFinish = true;
                }
            }
        }

        private prevClick(): void {
            --this.currentStep;
            if (this.currentStep < 3) {
                this.visibleNext = true;
                this.visibleFinish = false;

                if (this.currentStep == 1) {
                    this.visibleNext = true;
                    this.visiblePrev = false;
                }
            }            
        }

        private finishClick(): void {
           
        }
    }

    angular.module("survey")
           .controller("WizardController", WizardController);
}