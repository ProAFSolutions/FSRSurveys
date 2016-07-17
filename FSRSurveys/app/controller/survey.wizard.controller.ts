namespace survey {

    export class WizardController extends AbstractController { 
                
        public currentStep: number;
        public visibleNext: boolean;
        public visibleSubmit: boolean;
        public visiblePrev: boolean;
        public visibleFinish: boolean;  
        public isUserInfoValid: boolean;
        public isRunningMobile = false;
               
        constructor($scope: ng.IScope, dataContext: DataContext, surveyService: SurveyService) {
            super($scope, dataContext, surveyService);
            this.init();
        }
                                                           
        private init(): void
        {
            this.currentStep = 2;           
            this.visibleNext = true;
            this.visibleSubmit = false;
            this.visiblePrev = false;
            this.visibleFinish = false;            
            this.checkIfUserDirty();                      
        } 


        //Events
        public nextClick(): void {
            this.stepClick(++this.currentStep);           
        }

        public prevClick(): void {
            this.stepClick(--this.currentStep);               
        }

        public submitClick(): void {

            this.surveyService.saveSurvey(this.dataContext.userInfo, this.dataContext.questionnaireData).then(response => {
                if (response && response === 'OK') {
                    console.log('Hitting the server');
                   this.stepClick(++this.currentStep);
                }
            });

              
        }

        public closeClick(): void {

        }

        public stepClick(step: number): void {

            if (step > 1 && !this.dataContext.userInfo.validate())
                return;

            this.currentStep = step;

            switch (step) {
                case 1: {
                    this.visibleNext = true;
                    this.visibleSubmit = false;
                    this.visiblePrev = false;
                    this.visibleFinish = false;
                } break;

                case 2: {
                    this.visibleNext = false;
                    this.visibleSubmit = true;
                    this.visiblePrev = true;
                    this.visibleFinish = false;
                } break;

                case 3: {
                    this.visibleNext = false;
                    this.visibleSubmit = false;
                    this.visiblePrev = true;
                    this.visibleFinish = true;
                } break;
            }
        }

        public checkIfUserDirty(): void {
            var currentController = this;
            this.$scope.$watch(() => this.dataContext.userInfo, (newValue: any, oldValue: any) => {
                if (newValue != oldValue) {
                    currentController.isUserInfoValid = newValue.validate();
                }               
            }, true);
        }
       
    }

    angular.module("survey")
           .controller("WizardController", WizardController);
}