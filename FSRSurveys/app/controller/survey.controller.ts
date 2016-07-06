namespace survey {

    class SurveyController {       

        static $inject = ["SurveyService"];

        private surveyService: SurveyService;

        public currentStep: number;
        public visibleNext: boolean;
        public visiblePrev: boolean;
        public visibleFinish: boolean;
        public porcentage: number;
        public sliderOptions: any;

        public marketOptions: Array<string>;
        public propertyTypeOptions: Array<string>;

        public userInfo: UserInfo;
        public categories: Array<Category>;        
               

        constructor(surveyService: SurveyService) {
            this.surveyService = surveyService;
            this.initVars();
            this.resolveCategories();
            this.resolveMarketData();  
            this.setupPropertyTypes();   
        }
                                                           
        initVars(): void
        {
            this.currentStep = 1;
            this.visibleNext = true;
            this.visiblePrev = false;
            this.visibleFinish = false;
            this.porcentage = 0;
            this.sliderOptions = { floor: 0, ceil: 25 };
            this.userInfo = new UserInfo();            
        }

        resolveCategories(): void
        {
            this.categories = new Array<Category>();
            this.categories.push(new Category("Category1", "JobActivity1", 5, "AcivityOwner", "AcivityPerformed", "Technology"));  
            this.categories.push(new Category("Category2", "JobActivity2", 5, "AcivityOwner2", "AcivityPerformed", "Technology"));  
            this.categories.push(new Category("Category3", "JobActivity3", 5, "AcivityOwner3", "AcivityPerformed", "Technology"));     
        }

        resolveMarketData(): void
        {
            let controller = this;
            let result = this.surveyService.resolveMarketStates();
            result.get((response) => {
                if (response) {                   
                    controller.marketOptions = response.RestResponse.result;
                }
            });
        }

        setupPropertyTypes(): void {
            this.propertyTypeOptions = new Array<string>();           
            this.propertyTypeOptions.push('Sited', 'Non-Sited', 'Mixed Sited and Non-Sited');
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
           .controller("SurveyController", SurveyController);
}