namespace survey { 

    const SURVEY_API_BASE_URL = "http://localhost:23611/api/survey";
    const STATES_REST_URL = "http://services.groupkt.com/state/get/usa/all";

    interface ISurveyService {

         resolveMarketStates(): ng.IPromise<any>;

        resolveCategories(): ng.IPromise<any>;

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

        public resolveMarketStates(): ng.IPromise<any> {
            return this.$http.get(STATES_REST_URL).then(response => response.data);                      
        }
    }

    angular.module("survey").service("SurveyService", SurveyService);
}