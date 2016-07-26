namespace survey {    
    
    export class DataContext {    
        public isRunningMobile = false;         
        public sumbitBtnDisabled = true;
        public userInfo: any; 
        public questionnaireData = new Array<QuestionnaireItem>();
        public isSurveyDirty = false;

    }

    angular.module("survey").service("DataContext", DataContext);
}