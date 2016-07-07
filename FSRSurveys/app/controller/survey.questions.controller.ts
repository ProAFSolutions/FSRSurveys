namespace survey {

    class QuestionsController extends AbstractController { 
       
        public sliderOptions: any;
        public categories: Array<Category>; 
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
            this.populateCategories();
        }        

        private populateCategories(): void {
            let controller = this;
            this.surveyService.resolveCategories().then(response => {
                controller.categories = response;
            });
            /*this.categories = new Array<Category>();
            for (var i = 1; i < 20; i++) {
                this.categories.push(new Category(i, "Activity Name not Required " + i, "This is the job activity that we need to do" + i));
            }*/
        }

        public addCategoryClick(): void
        {
            this.categories.push(new Category(22, "Other", "This is the job activity that we need to do"));
        }
    }

    angular.module("survey")
           .controller("QuestionsController", QuestionsController);
}