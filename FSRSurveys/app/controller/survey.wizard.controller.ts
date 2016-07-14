namespace survey {

    class WizardController extends AbstractController { 
                
        public currentStep: number;
        public visibleNext: boolean;
        public visibleSubmit: boolean;
        public visiblePrev: boolean;
        public visibleFinish: boolean;      
               
        constructor($scope: ng.IScope, dataContext: DataContext, surveyService: SurveyService) {
            super($scope, dataContext, surveyService);
            this.init();
        }
                                                           
        private init(): void
        {
            this.currentStep = 1;
            this.visibleNext = true;
            this.visibleSubmit = false;
            this.visiblePrev = false;
            this.visibleFinish = false;                          
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

       
    }

    angular.module("survey")
           .controller("WizardController", WizardController);
}