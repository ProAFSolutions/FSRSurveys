﻿namespace survey {

    class QuestionnaireController extends AbstractController { 
       
        public sliderOptions: any;
        public questionnaireData: Array<QuestionnaireItem>;       
        public activityOwnerOptions: Array<string>; 
        public activityPerformedOptions: Array<string>;
        public percentageTimeEffortOptions: Array<number>;

        public percentageTimeEffort: number;
        public totalActivityOwner: number;
        public totalActivityPerformed: number;
        public totalTechnology: number;

        constructor($scope: ng.IScope, cache: SurveyCache, surveyService: SurveyService) {
            super($scope, cache, surveyService);
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
            this.percentageTimeEffortOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50];
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

            this.questionnaireData = new Array<QuestionnaireItem>();   

            this.surveyService.resolveCategories().then(response => {
                let categories = response;
                for (var category of categories) {
                    this.questionnaireData.push(new QuestionnaireItem(category, new Answer()));
                }
                this.questionnaireData.push(new QuestionnaireItem(new Category(0, "Other", ""), new Answer()));
            });
        }

        private calculateTotals(): void
        {

            var currentController = this;

            this.$scope.$watch(() => this.questionnaireData, (newValue: Array<QuestionnaireItem>, oldValue: Array<QuestionnaireItem>) => {

                currentController.initTotals();     

                for (var questionnaireItem of newValue) {
                    currentController.percentageTimeEffort += questionnaireItem.answer.timeEffort;

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
                currentController.validateQuestionnaire();
            });

            this.$scope.$watch(() => this.totalActivityOwner, (newValue: number, oldValue: number) => {
                currentController.validateQuestionnaire();
            });

            this.$scope.$watch(() => this.totalActivityPerformed, (newValue: number, oldValue: number) => {
                currentController.validateQuestionnaire();
            });

            this.$scope.$watch(() => this.totalTechnology, (newValue: number, oldValue: number) => {
                currentController.validateQuestionnaire();
            });
        } 

        private validateQuestionnaire(): void {
            var totalItems = this.questionnaireData.length;
            this.cache.sumbitBtnDisabled = this.percentageTimeEffort == 100 &&
            this.totalActivityOwner == totalItems &&
            this.totalActivityPerformed == totalItems &&
            this.totalTechnology == totalItems;
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