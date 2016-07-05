module survey.service {

    interface ISurveyService {

    }

    export class SurveyService implements ISurveyService {

     
    }

    angular.module("survey").service("surveyService", SurveyService);
}