namespace survey {    
    
    export class SurveyCache {             
        public sumbitBtnDisabled = true;
    }

    angular.module("survey").service("SurveyCache", SurveyCache);
}