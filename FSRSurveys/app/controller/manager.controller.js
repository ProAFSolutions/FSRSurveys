var survey;
(function (survey) {
    var ManagerController = (function () {
        function ManagerController() {
            this.initWizard();
        }
        ManagerController.prototype.initWizard = function () {
            this.currentStep = 1;
            this.visibleNext = true;
            this.visiblePrev = false;
            this.visibleFinish = false;
            this.porcentage = 0;
        };
        ManagerController.prototype.nextClick = function () {
            ++this.currentStep;
            if (this.currentStep > 1) {
                this.visiblePrev = true;
                if (this.currentStep == 3) {
                    this.visibleNext = false;
                    this.visibleFinish = true;
                }
            }
        };
        ManagerController.prototype.prevClick = function () {
            --this.currentStep;
            if (this.currentStep < 3) {
                this.visibleNext = true;
                this.visibleFinish = false;
                if (this.currentStep == 1) {
                    this.visibleNext = true;
                    this.visiblePrev = false;
                }
            }
        };
        ManagerController.prototype.finishClick = function () {
        };
        return ManagerController;
    }());
    angular.module("survey")
        .controller("ManagerController", ManagerController);
})(survey || (survey = {}));
//# sourceMappingURL=manager.controller.js.map