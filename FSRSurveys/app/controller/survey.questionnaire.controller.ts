namespace survey {

    class QuestionnaireController extends AbstractController { 
       
        public sliderOptions: any;
        public activityOwnerOptions: Array<string>; 
        public activityPerformedOptions: Array<string>;
        public percentageTimeEffortOptions: Array<number>;

        public percentageTimeEffort: number;
        public totalActivityOwner: number;
        public totalActivityPerformed: number;
        public totalTechnology: number;

        constructor($scope: ng.IScope, dataContext: DataContext, surveyService: SurveyService) {
            super($scope, dataContext, surveyService);
            this.init();
        }


        private init(): void {            

            this.initTotals();

            /*this.sliderOptions = {
                floor: 0,
                ceil: 25,
                step: 1,
                translate: function (value) {
                    return value + " %";
                }
            };*/

            this.percentageTimeEffortOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100];
            this.activityOwnerOptions = ['Manager', 'Admin', 'Accounting', 'Joint Manager & Admin', 'Joint Manager & Accounting', 'Other', 'N/A'];
            this.activityPerformedOptions = ['Manual', 'Electronic', 'Email', 'N/A'];

            this.populateQuestionnaire();    

            this.calculateTotals();
        }   

        private initTotals(): void {
            this.percentageTimeEffort = 0;
            this.totalActivityOwner = 0;
            this.totalActivityPerformed = 0;
            this.totalTechnology = 0;
        } 

        private populateQuestionnaire(): void {

            this.dataContext.questionnaireData = new Array<QuestionnaireItem>();   

            this.surveyService.resolveCategories().then(response => {
                let categories = response;
                for (var category of categories) {
                    this.dataContext.questionnaireData.push(new QuestionnaireItem(category, new Answer()));
                }                
            });
        }

        private calculateTotals(): void
        {

            var currentController = this;

            this.$scope.$watch(() => this.dataContext.questionnaireData, (newValue: Array<QuestionnaireItem>, oldValue: Array<QuestionnaireItem>) => {

                currentController.initTotals();     

                for (var questionnaireItem of newValue) {
                    if (questionnaireItem.answer.timeEffort) {
                        currentController.percentageTimeEffort += questionnaireItem.answer.timeEffort;
                    }                        

                    if (questionnaireItem.answer.activityOwner) {
                        currentController.totalActivityOwner++;
                    }
                    if (questionnaireItem.answer.activityPerformed) {
                        currentController.totalActivityPerformed++;
                    }
                    if (questionnaireItem.answer.technology) {
                        currentController.totalTechnology++;
                    }
                } 
            }, true);


            this.$scope.$watch(() => this.percentageTimeEffort, (newValue: number, oldValue: number) => {
                if (newValue != oldValue)
                   currentController.validateQuestionnaire();
            });

            this.$scope.$watch(() => this.totalActivityOwner, (newValue: number, oldValue: number) => {
                if (newValue != oldValue)
                    currentController.validateQuestionnaire();
            });

            this.$scope.$watch(() => this.totalActivityPerformed, (newValue: number, oldValue: number) => {
                if (newValue != oldValue)
                    currentController.validateQuestionnaire();
            });

            this.$scope.$watch(() => this.totalTechnology, (newValue: number, oldValue: number) => {
                if (newValue != oldValue)
                    currentController.validateQuestionnaire();
            });
        } 

        private validateQuestionnaire(): void {
            var totalItems = this.dataContext.questionnaireData.length;
            this.dataContext.sumbitBtnDisabled = !(this.percentageTimeEffort == 100 &&
            this.totalActivityOwner == totalItems &&
            this.totalActivityPerformed == totalItems &&
            this.totalTechnology == totalItems);
        }
       
        /*public addQuestionnaireItemClick(): void {           
            this.dataContext.questionnaireData.push(new QuestionnaireItem(new Category(0, "Other", ""), new Answer()));

            //TODO create an Angular Directive for this
            setTimeout(() => {
                $("textarea.no-border:last").focus();
            }, 500);
        }*/

        public closeOtherClick(index: number): void {
            this.dataContext.questionnaireData.splice(index, 1);
        }
    }

    angular.module("survey")
           .controller("QuestionnaireController", QuestionnaireController);
}