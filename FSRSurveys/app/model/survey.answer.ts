namespace survey {

    export class Answer {

        public timeEffort: number;

        public activityOwner: string;
        public activityPerformed: string;
        public technology: string;

        constructor() {
            this.timeEffort = 0;
            this.activityOwner = "";
            this.activityPerformed = "";
            this.technology = "";
        }

    }


}