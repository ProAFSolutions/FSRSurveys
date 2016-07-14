namespace survey {

    export abstract class AbstractController {       

        static $inject = ["$scope", "DataContext", "SurveyService"];

        protected $scope: any;
        public dataContext: DataContext;
        protected surveyService: SurveyService;      
      
        constructor($scope: ng.IScope, dataContext: DataContext, surveyService: SurveyService) {
            this.$scope = $scope;
            this.dataContext = dataContext;         
            this.surveyService = surveyService;
        }        
    }    
}