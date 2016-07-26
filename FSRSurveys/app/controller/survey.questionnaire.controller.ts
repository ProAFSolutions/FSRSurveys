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

        public totalActivityPerformedYes: number;
        public totalTechnologyYes: number;

        public firstTime = true;

        constructor($scope: ng.IScope, dataContext: DataContext, surveyService: SurveyService) {
            super($scope, dataContext, surveyService);
            this.init();
        }


        private init(): void {            

            this.initTotals();           

            this.percentageTimeEffortOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 75, 100];
            this.activityOwnerOptions = ['Manager', 'Admin', 'Accounting', 'Asst Mgr', 'Other', 'N/A'];
                /*'Joint Mgr & Admin', 'Joint Mgr & Accounting',
                'Joint Mgr & Asst Mgr', 'Joint Asst Mgr & Admin',
                'Joint Mgr & Asst Mgr & Admin'*/
           
            this.activityPerformedOptions = ['Yes', 'No', 'N/A'];

            this.calculateTotals();
        }   

        private initTotals(): void {
            this.percentageTimeEffort = 0;
            this.totalActivityOwner = 0;
            this.totalActivityPerformed = 0;           
            this.totalTechnology = 0;

            this.totalActivityPerformedYes = 0;
            this.totalTechnologyYes = 0;
        } 

        private calculateTotals(): void
        {

            var currentController = this;

            this.$scope.$watch(() => this.dataContext.questionnaireData, (newValue: Array<QuestionnaireItem>, oldValue: Array<QuestionnaireItem>) => {                

                currentController.initTotals();     

                var index = 0;
                for (var questionnaireItem of newValue) {

                    if (questionnaireItem.answer.timeEffort >= 0) {
                        var oldTimeEffort = oldValue[index].answer.timeEffort;
                        if (questionnaireItem.answer.timeEffort != oldTimeEffort && questionnaireItem.answer.timeEffort == 0) {
                            questionnaireItem.answer.activityOwner = 'N/A';
                            questionnaireItem.answer.activityPerformed = 'N/A';                           
                        }
                        currentController.percentageTimeEffort += questionnaireItem.answer.timeEffort;                        
                    }                        

                    if (questionnaireItem.answer.activityOwner) {
                        currentController.totalActivityOwner++;
                    }
                    if (questionnaireItem.answer.activityPerformed) {
                        currentController.totalActivityPerformed++;
                        if (questionnaireItem.answer.activityPerformed === 'Yes') {
                            currentController.totalActivityPerformedYes++;
                        }
                    }
                    if (questionnaireItem.answer.technology) {
                        currentController.totalTechnology++;
                        if (questionnaireItem.answer.activityPerformed) {
                            if (questionnaireItem.answer.activityPerformed === 'Yes') {
                                currentController.totalTechnologyYes++;
                            } else {
                                questionnaireItem.answer.technology = null;
                            }
                        }
                    }

                    index++;
                } 
            }, true);         


            this.$scope.$watch(() => this.percentageTimeEffort, (newValue: number, oldValue: number) => {
                if (newValue != oldValue) {
                    if (newValue == 100) {
                        for (var questionnaireItem of this.dataContext.questionnaireData) {
                            if (!questionnaireItem.answer.timeEffort) {
                                questionnaireItem.answer.timeEffort = 0;
                            }
                        }
                    } else if (oldValue == 100 && newValue != 100) {      

                        if (questionnaireItem.answer.timeEffort == 0 && questionnaireItem.answer.activityOwner == 'N/A' && questionnaireItem.answer.activityPerformed == 'N/A') {                            
                            questionnaireItem.answer.activityOwner = null;
                            questionnaireItem.answer.activityPerformed = null;
                            questionnaireItem.answer.technology = null;
                        }                                             
                    }

                    currentController.validateQuestionnaire();
                }
                  
            });

            this.$scope.$watch(() => this.totalActivityOwner, (newValue: number, oldValue: number) => {
                if (newValue != oldValue)
                    currentController.validateQuestionnaire();
            });

            this.$scope.$watch(() => this.totalActivityPerformed, (newValue: number, oldValue: number) => {
                if (newValue != oldValue)
                    currentController.validateQuestionnaire();
            });

            this.$scope.$watch(() => this.totalActivityPerformedYes, (newValue: number, oldValue: number) => {
                if (newValue != oldValue)
                    currentController.validateQuestionnaire();
            });

            this.$scope.$watch(() => this.totalTechnologyYes, (newValue: number, oldValue: number) => {
                if (newValue != oldValue)
                    currentController.validateQuestionnaire();
            });
        } 

        private validateQuestionnaire(): void {
            this.checkIfDirty();
            var totalItems = this.dataContext.questionnaireData.length;
            this.dataContext.sumbitBtnDisabled = !(this.percentageTimeEffort == 100 &&
                this.totalActivityOwner == totalItems &&
                this.totalActivityPerformed == totalItems &&
                this.totalActivityPerformedYes == this.totalTechnologyYes);
        }

        private checkIfDirty(): void {
            this.dataContext.isSurveyDirty = this.percentageTimeEffort > 0 || this.totalActivityOwner > 0 ||
                this.totalActivityPerformed > 0 || this.totalTechnology > 0;                    
        }
               
        public closeOtherClick(index: number): void {
            this.dataContext.questionnaireData.splice(index, 1);
        }
    }

    angular.module("survey")
           .controller("QuestionnaireController", QuestionnaireController);
}