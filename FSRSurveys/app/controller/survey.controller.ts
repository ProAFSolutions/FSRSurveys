namespace survey {

    class SurveyController {       

        static $inject = ["SurveyService"];       

        private surveyService: SurveyService;

        public surveyType: number;
        public currentStep: number;
        public visibleNext: boolean;
        public visiblePrev: boolean;
        public visibleFinish: boolean;
        public porcentage: number;
        public sliderOptions: any;
        
        //Dropdown options
        public marketOptions: Array<string>;
        public propertyTypeOptions: Array<string>;

        public categories: Array<Category>; 
        public userInfo: any;
               
               

        constructor(surveyService: SurveyService) {
            this.surveyService = surveyService;
            this.init(); 
        }
                                                           
        init(): void
        {
            this.surveyType = 1;
            this.currentStep = 1;
            this.visibleNext = true;
            this.visiblePrev = false;
            this.visibleFinish = false;
            this.porcentage = 0;
            this.sliderOptions = {
                floor: 0,
                ceil: 25,
                translate: function (value) {
                    return value + " %";
                }
            };

            this.populateMarketOptions();
            this.populateCategories();            

            this.propertyTypeOptions = new Array<string>();
            this.propertyTypeOptions.push('Sited', 'Non-Sited', 'Mixed Sited and Non-Sited');

            this.userInfo = this.surveyType == 1 ? new ManagerInfo() : new AdminInfo();            
        }    

        populateMarketOptions(): void {
            let controller = this;
            this.surveyService.resolveMarketStates().then(response => {
                controller.marketOptions = response.RestResponse.result;
            });
        }

        populateCategories(): void {
            /*let controller = this;
            this.surveyService.resolveCategories().then(response => {
                controller.categories = response;
            });*/
            this.categories = new Array<Category>();
            for (var i = 1; i < 20; i++) {
                this.categories.push(new Category(i, "Activity Name not Required " + i, "This is the job activity that we need to do" + i));
            }            
        }


        //Events
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
           .controller("SurveyController", SurveyController);
}