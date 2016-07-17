namespace survey { 

    //const SURVEY_API_BASE_URL = "http://localhost:23611/api/survey";  
    const SURVEY_API_BASE_URL = "http://rolesurvey.fsresidential.com/api/api/survey";    

    interface ISurveyService {

        resolveMarkets(): ng.IPromise<Array<Market>>;

        resolveCategories(): ng.IPromise<Array<Category>>;

        saveSurvey(userInfo: any, items: Array<QuestionnaireItem>): ng.IPromise<any>;      
    }
    
    export class SurveyService implements ISurveyService {

        static $inject = ["$http"];

        private $http: ng.IHttpService;       

        constructor($httpService: ng.IHttpService)
        {           
            this.$http = $httpService;
        }  

        public saveSurvey(userInfo: any, items: Array<QuestionnaireItem>): ng.IPromise<any>
        {
            //return this.$http.post(SURVEY_API_BASE_URL + "/save", { userInfo: userInfo, items: items }).then(response => response.data);

            return this.$http({
                url: SURVEY_API_BASE_URL + "/save",
                method: 'POST',
                data: { userInfo: userInfo, items: items },
                withCredentials: false,
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => response.data);
        }       

        public resolveCategories(): ng.IPromise<Array<Category>>
        {
            return this.$http.get(SURVEY_API_BASE_URL + "/categories").then(response => response.data);                  
        }

        public resolveMarkets(): ng.IPromise<Array<Market>> {
            return this.$http.get(SURVEY_API_BASE_URL + "/markets").then(response => response.data);
        }      
    }

    angular.module("survey").service("SurveyService", SurveyService);
}