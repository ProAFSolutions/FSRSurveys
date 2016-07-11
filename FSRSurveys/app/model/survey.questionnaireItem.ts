namespace survey {

    export class QuestionnaireItem {

        public category: Category;

        public answer: Answer;

        constructor(category: Category, answer: Answer) {
            this.category = category;
            this.answer = answer;
        }        
    }


}