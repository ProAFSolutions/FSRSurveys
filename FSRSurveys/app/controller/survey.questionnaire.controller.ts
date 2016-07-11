namespace survey {

    class QuestionnaireController extends AbstractController { 
       
        public sliderOptions: any;
        public questionnaireData: Array<QuestionnaireItem>;       
        public activityOwnerOptions: Array<string>; 
        public activityPerformedOptions: Array<string>; 

        public percentageTimeEffort: number;
        public totalActivityOwner: number;
        public totalActivityPerformed: number;
        public totalTechnology: number;
       
        constructor($scope: ng.IScope, surveyService: SurveyService) {
            super($scope, surveyService);
            this.init();
        }

        private init(): void {            

            this.initTotals();

            this.sliderOptions = {
                floor: 0,
                ceil: 25,
                step: 1,
                translate: function (value) {
                    return value + " %";
                }
            };
            this.activityOwnerOptions = ['Manager', 'Admin', 'Other', 'N/A'];
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
            let controller = this;
            controller.questionnaireData = new Array<QuestionnaireItem>();   

            this.surveyService.resolveCategories().then(response => {
                let categories = response;
                for (var category of categories) {
                    controller.questionnaireData.push(new QuestionnaireItem(category, new Answer()));
                }
            });
        }

        private calculateTotals(): void
        {
            var overflowedIndex = -1;
            var prevOverflowedValue = 0;
            this.$scope.$watch(() => this.questionnaireData, (newValue: Array<QuestionnaireItem>, oldValue: Array<QuestionnaireItem>) => {

                this.initTotals();               
                
                for (var i = 0; i < newValue.length; i++) {

                    var questionnaireItem = newValue[i];                    

                    if ((this.percentageTimeEffort + questionnaireItem.answer.timeEffort) <= 100) {
                        this.percentageTimeEffort += questionnaireItem.answer.timeEffort;
                    } else {                        
                        overflowedIndex = i;
                        prevOverflowedValue = oldValue[overflowedIndex].answer.timeEffort;
                        break;                      
                    }             

                    if (questionnaireItem.answer.activityOwner) {
                        this.totalActivityOwner++;
                    }
                    if (questionnaireItem.answer.activityPerformed) {
                        this.totalActivityPerformed++;
                    }
                    if (questionnaireItem.answer.technology) {
                        this.totalTechnology++;
                    }
                }           

            }, true);

            if (overflowedIndex > -1) {
                alert("Time effort exceeds 100%. Please, adjust the answers with the proper values");
                this.questionnaireData[overflowedIndex].answer.timeEffort = prevOverflowedValue;
            }  
        }      

        public addQuestionnaireItemClick(): void {           
            this.questionnaireData.push(new QuestionnaireItem(new Category(0, "Other", ""), new Answer()));

            //TODO create an Angular Directive for this
            setTimeout(() => {
                $("textarea.no-border:last").focus();
            }, 500);
        }

        public closeOtherClick(index: number): void {
            this.questionnaireData.splice(index, 1);
        }
    }

    class WarnDialogController {

    }

    angular.module("survey")
           .controller("QuestionnaireController", QuestionnaireController);
}