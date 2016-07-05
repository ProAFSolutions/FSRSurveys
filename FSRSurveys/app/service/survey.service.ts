namespace survey { 

    const SURVEY_API_BASE_URL = "http://localhost:61326/api/survey";
    const STATES_REST_URL = "http://services.groupkt.com/state/get/usa/all";

    interface ISurveyService {
        save(userInfo: UserInfo, category: Category): void;
    }

    export class SurveyService implements ISurveyService {

        static $inject = ["$resource"];

        private $resource: any;

        constructor($resource: ng.resource.IResourceService) {
            this.$resource = $resource;
        }  

        save(userInfo: UserInfo, category: Category): void
        {

        }

        resolveMarketStates(): void {
          
        }
    }

    angular.module("survey").service("SurveyService", SurveyService);
}