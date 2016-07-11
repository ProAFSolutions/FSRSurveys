namespace survey {

    export abstract class AbstractController {       

        static $inject = ["$scope", "SurveyCache", "SurveyService"];

        protected $scope: any;
        public cache: SurveyCache;
        protected surveyService: SurveyService;      
      
        constructor($scope: ng.IScope, cache: SurveyCache, surveyService: SurveyService) {
            this.$scope = $scope;
            this.cache = cache;         
            this.surveyService = surveyService;
        }        
    }    
}