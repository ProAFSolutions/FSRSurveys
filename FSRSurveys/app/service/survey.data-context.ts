namespace survey {    
    
    export class DataContext {             
        public sumbitBtnDisabled = true;
        public userInfo: any; 
        public questionnaireData: Array<QuestionnaireItem>;      
    }

    angular.module("survey").service("DataContext", DataContext);
}