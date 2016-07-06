namespace survey {   

    class UserInfo {

        public name: string;       
        public email: string;
        public propertyType: string;
        public propertyName: string;  
        public associationsNumber: number; 
        public unitsTotal: number;     
        public marketName: string;

        constructor() { } 
    }

    export class AdminInfo extends UserInfo
    {
        public officeLocation: string;
        public managersNumber: number;

        constructor() {
            super();            
        }       
    }

    export class ManagerInfo extends UserInfo {       
            
        public rdSupervisorName: string;
        public vpSupervisorName: string;

        constructor() {
            super();
        }
    }
   
}