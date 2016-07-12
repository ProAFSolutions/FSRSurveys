namespace survey { 

    const SURVEY_API_BASE_URL = "http://rolesurvey.fsresidential.com/api/api/survey";    

    interface ISurveyService {

        resolveMarkets(): ng.IPromise<Array<Market>>;

        resolveCategories(): ng.IPromise<Array<Category>>;

        saveManagerSurvey(userInfo: ManagerInfo, categories: Array<Category>): void;

        saveAdminSurvey(userInfo: AdminInfo, categories: Array<Category>): void
    }
    
    export class SurveyService implements ISurveyService {

        static $inject = ["$q", "$http"];

        private $http: ng.IHttpService;
        private $q: ng.IQService;

        constructor($q: ng.IQService, $httpService: ng.IHttpService)
        {
            this.$q = $q;
            this.$http = $httpService;
        }  

        public saveManagerSurvey(userInfo: ManagerInfo, categories: Array<Category>): void
        {

        }

        public saveAdminSurvey(userInfo: AdminInfo, categories: Array<Category>): void
        {
            
        }

        public resolveCategories(): ng.IPromise<Array<Category>> {
            return this.$http.get(SURVEY_API_BASE_URL + "/categories").then(response => response.data);                  
        }

        public resolveMarkets(): ng.IPromise<Array<Market>> {
            return this.$http.get(SURVEY_API_BASE_URL + "/markets").then(response => response.data);
        }      
    }

    angular.module("survey").service("SurveyService", SurveyService);
}