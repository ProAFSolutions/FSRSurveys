namespace survey {

    export abstract class AbstractController {       

        static $inject = ["$scope", "SurveyService"];

        protected $scope: any;
        protected surveyService: SurveyService;      
      
        constructor($scope: ng.IScope, surveyService: SurveyService) {
            this.$scope = $scope;            
            this.surveyService = surveyService;
        }        
    }    
}