namespace survey {   

    export class Category {

        public id: number;
        public name: string;
        public jobActivity: string;
        

        constructor(id: number, name: string, jobActivity: string)
        {
            this.id = id;
            this.name = name;
            this.jobActivity = jobActivity;           
        }
    }

   
}