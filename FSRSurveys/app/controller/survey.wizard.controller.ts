namespace survey {

    export class WizardController extends AbstractController { 
                
        public currentStep: number;
        public visibleNext: boolean;
        public visibleSubmit: boolean;
        public visiblePrev: boolean;
        public visibleFinish: boolean;  
        public isUserInfoValid: boolean;
        public isBusy: boolean;        
               
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
            this.isBusy = false;          
            this.checkIfUserDirty(); 
            this.preventReload();          
        } 


        private preventReload(): void{
            var currentController = this;
            $(window).on("beforeunload", () => {
                if (this.currentStep < 3 && currentController.dataContext.isSurveyDirty)
                    return 'Changes you made may not be saved';
                
                return;           
            });
        }

        //Events
        public nextClick(): void {
            this.stepClick(++this.currentStep);           
        }

        public prevClick(): void {
            this.stepClick(--this.currentStep);               
        }

        public submitClick(): void {
            this.isBusy = true;
            this.surveyService.saveSurvey(this.dataContext.userInfo, this.dataContext.questionnaireData).then(response => {
                this.isBusy = false;
                if (response && response === 'success') {                                       
                   this.stepClick(++this.currentStep);
                }
            }, error => {
                this.isBusy = false;
                console.log(error);
            });              
        }

        public checkIfUserDirty(): void {
            var currentController = this;
            this.$scope.$watch(() => this.dataContext.userInfo, (newValue: any, oldValue: any) => {
                if (newValue != oldValue) {
                    currentController.isUserInfoValid = newValue.validate();
                }
            }, true);
        }

        private populateQuestionnaire(): void {         
            var currentController = this;
            this.isBusy = true;
            this.surveyService.resolveCategories().then(response => {
                let categories = response;
                for (var category of categories) {
                    this.dataContext.questionnaireData.push(new QuestionnaireItem(category, new Answer()));
                }

                if (categories[categories.length - 1].name !== 'Other') {
                    this.dataContext.questionnaireData.push(new QuestionnaireItem(new Category(0, 'Other', ''), new Answer()));
                }

                this.isBusy = false;

            }, error => {
                this.isBusy = false;
                console.log(error);
            });
        }

        public closeClick(): void {
            location.href = "https://www.fsresidential.com";
        }

        public stepClick(step: number): void {

            if (step > 1 && !this.dataContext.userInfo.validate())
                return;

            if (step > 2 && this.dataContext.sumbitBtnDisabled)
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
                    if (this.dataContext.questionnaireData == null || this.dataContext.questionnaireData.length == 0) {
                        this.populateQuestionnaire();
                    }
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