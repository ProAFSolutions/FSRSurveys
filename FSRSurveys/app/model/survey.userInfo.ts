namespace survey {   

    export class UserInfo {

        public name: string;       
        public email: string;
        public propertyType: string;
        public propertyName: string;  
        public associationsNumber: number; 
        public unitsTotal: number;     
        public marketName: string;

        constructor() { } 

        public isNullOrEmpty(value: string) {
            return value == null || value === '' || value.length === 0;
        }

        public validate(): boolean {
            return !this.isNullOrEmpty(this.name) &&
                   !this.isNullOrEmpty(this.email) &&
                   !this.isNullOrEmpty(this.propertyType) &&
                   !this.isNullOrEmpty(this.marketName) &&
                   this.associationsNumber > 0 &&
                   this.unitsTotal > 0;           
        }

        public copyFrom(updated: UserInfo) {
            this.name = updated.name;
            this.email = updated.email;
            this.marketName = updated.marketName;
            this.propertyType = updated.propertyType;
            this.propertyName = updated.propertyName;
            this.unitsTotal = updated.unitsTotal;
            this.associationsNumber = updated.associationsNumber;
        }
    }

    export class AdminInfo extends UserInfo
    {       
        public managersNumber: number;

        constructor() {
            super();            
        }   

        public validate(): boolean {
            return super.validate() && this.managersNumber > 0;
        }       
    }

    export class ManagerInfo extends UserInfo {       
            
        public rdSupervisorName: string;
        public vpSupervisorName: string;

        constructor() {
            super();
        }

        public validate(): boolean {
            return super.validate() && !this.isNullOrEmpty(this.rdSupervisorName) && !this.isNullOrEmpty(this.vpSupervisorName);
        }

        
    }
   
}