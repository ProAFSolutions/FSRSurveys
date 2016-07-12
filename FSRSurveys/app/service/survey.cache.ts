namespace survey {    
    
    export class SurveyCache {             
        public sumbitBtnDisabled = true;
        public questionnaireData: Array<QuestionnaireItem>;      
    }

    angular.module("survey").service("SurveyCache", SurveyCache);
}