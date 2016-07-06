namespace survey { 

    const SURVEY_API_BASE_URL = "http://localhost:61326/api/survey";
    const STATES_REST_URL = "http://services.groupkt.com/state/get/usa/all";

    interface ISurveyService {
        save(userInfo: UserInfo, categories: Array<number>): void;
    }
    
    export class SurveyService implements ISurveyService {

        static $inject = ["$resource"];

        private $resource: ng.resource.IResourceService;

        constructor($resource: ng.resource.IResourceService) {
            this.$resource = $resource;
        }  

        save(userInfo: UserInfo, categories: Array<number>): void
        {

        }

        resolveMarketStates(): ng.resource.IResourceClass<ng.resource.IResource<any>> {
            return this.$resource(STATES_REST_URL);
        }
    }

    angular.module("survey").service("SurveyService", SurveyService);
}