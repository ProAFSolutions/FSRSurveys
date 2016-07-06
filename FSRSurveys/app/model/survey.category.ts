namespace survey {   

    export class Category {

        public name: string;
        public jobActivity: string;
        public timeEffort: number;
        public activityOwner: string;
        public activityPerformed: string;
        public technology: string;

        constructor(name: string, jobActivity: string, timeEffort: number, activityOwner: string, activityPerformed: string, technology: string)
        {
            this.name = name;
            this.jobActivity = jobActivity;
            this.timeEffort = timeEffort;
            this.activityOwner = activityOwner;
            this.activityPerformed = activityPerformed;
            this.technology = technology;
        }
    }

   
}