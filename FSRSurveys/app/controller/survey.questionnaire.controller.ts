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

            this.sliderOptions = {
                floor: 0,
                ceil: 25,
                translate: function (value) {
                    return value + " %";
                }
            };
            this.activityOwnerOptions = ['Manager', 'Admin', 'Other', 'N/A'];
            this.activityPerformedOptions = ['Manual', 'Electronic', 'Email', 'N/A'];

            this.populateQuestionnaire();
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
            /*this.categories = new Array<Category>();
            for (var i = 1; i < 20; i++) {
                this.categories.push(new Category(i, "Activity Name not Required " + i, "This is the job activity that we need to do" + i));
            }*/
        }

        public addQuestionnaireItemClick(): void {
            this.questionnaireData.push(new QuestionnaireItem(new Category(0, "Other", ""), new Answer()));

            //TODO create Angular Directive for this
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