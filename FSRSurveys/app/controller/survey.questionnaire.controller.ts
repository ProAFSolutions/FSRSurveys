namespace survey {

    class QuestionnaireController extends AbstractController { 
       
        public sliderOptions: any;
        public questionnaireData: Array<QuestionnaireItem>;       
        public activityOwnerOptions: Array<string>; 
        public activityPerformedOptions: Array<string>; 
       
        constructor($scope: ng.IScope, surveyService: SurveyService) {
            super($scope, surveyService);
            this.init();
        }

        private init(): void {

            this.$scope.percentage = 35;

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

            this.setupWatchers();
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

        private setupWatchers(): void
        {
            this.$scope.$watch(() => this.$scope.percentage, (newValue: number, oldValue: number) => {
                this.updatePercentage(newValue, oldValue);
            }, true);
        }

        private updatePercentage(oldValue: number, newValue: number) {
            if (oldValue !== newValue) {
                console.log("This is the new value " + newValue);
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

    angular.module("survey")
           .controller("QuestionnaireController", QuestionnaireController);
}