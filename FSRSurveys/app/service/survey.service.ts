namespace survey { 

    //const SURVEY_API_BASE_URL = "http://localhost:23611/api/survey";  
    const SURVEY_API_BASE_URL = "http://rolesurvey.fsresidential.com/api/api/survey";    

    interface ISurveyService {

        resolveMarkets(): ng.IPromise<Array<Market>>;

        resolveCategories(email: string): ng.IPromise<Array<Category>>;

        saveSurvey(userInfo: any, items: Array<QuestionnaireItem>): ng.IPromise<any>;   

        getQuestionnaireData(email: string, password: string): ng.IPromise<QuestionnaireData>;

        checkUser(email: string): ng.IPromise<boolean>;
    }
    
    export class SurveyService implements ISurveyService {

        static $inject = ["$http"];

        private $http: ng.IHttpService;       

        constructor($httpService: ng.IHttpService)
        {           
            this.$http = $httpService;
        }  

        public getQuestionnaireData(email: string, password: string): ng.IPromise<QuestionnaireData> {
            return this.$http.get(SURVEY_API_BASE_URL + "/questionnaire-data/" + email + "/" + password).then(response => response.data);
        }

        public saveSurvey(userInfo: any, items: Array<QuestionnaireItem>): ng.IPromise<any>
        {
            var questionnaireData = new QuestionnaireData();
            questionnaireData.items = items;

            if (userInfo.associateType === 'Manager')
                questionnaireData.managerInfo = userInfo;

            else if (userInfo.associateType === 'Administrator')
                questionnaireData.adminInfo = userInfo;

            else
                questionnaireData.assistantInfo = userInfo;

            return this.$http.post(SURVEY_API_BASE_URL + "/save", questionnaireData).then(response => response.data);
        }       

        public resolveCategories(): ng.IPromise<Array<Category>>
        {
            return this.$http.get(SURVEY_API_BASE_URL + "/categories").then(response => response.data);                  
        }

        public checkUser(email: string): ng.IPromise<boolean> {
            return this.$http.get(SURVEY_API_BASE_URL + "/check/" + email).then(response => response.data);
        }

        public resolveMarkets(): ng.IPromise<Array<Market>>
        {
            return this.$http.get(SURVEY_API_BASE_URL + "/markets").then(response => response.data);
        }      
    }

    angular.module("survey").service("SurveyService", SurveyService);
}