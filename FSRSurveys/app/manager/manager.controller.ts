module survey {

    class ManagerController {

        public currentStep: number;

        public visibleNext: boolean;
        public visiblePrev: boolean;
        public visibleFinish: boolean;
        public porcentage: number;
        
        constructor() {
            this.initWizard();
        }
            
        initWizard(): void {
            this.currentStep = 1;
            this.visibleNext = true;
            this.visiblePrev = false;
            this.visibleFinish = false;
            this.porcentage = 0;
        }   

        nextClick(): void {
            ++this.currentStep;
            if (this.currentStep > 1) {
                this.visiblePrev = true;
                if (this.currentStep == 3) {
                    this.visibleNext = false;
                    this.visibleFinish = true;
                }
            }
        }

        prevClick(): void {
            --this.currentStep;
            if (this.currentStep < 3) {
                this.visibleNext = true;
                this.visibleFinish = false;
                if (this.currentStep == 1) {
                    this.visibleNext = true;
                    this.visiblePrev = false;
                }
            }            
        }

        finishClick(): void {
           
        }
    }

    angular.module("survey")
        .controller("ManagerController", ManagerController);
}