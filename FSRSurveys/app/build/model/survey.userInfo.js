var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var UserInfo = (function () {
        function UserInfo() {
            this.unitsTotal = 0;
            this.propertiesTotal = 0;
            this.totalNumberBoardMeetingAttendedPerYear = 0;
            this.recoveryPassword = '';
        }
        UserInfo.prototype.isNullOrEmpty = function (value) {
            return value == null || value === '' || value.length === 0;
        };
        UserInfo.prototype.validate = function () {
            return !this.isNullOrEmpty(this.name) &&
                !this.isNullOrEmpty(this.email) &&
                !this.isNullOrEmpty(this.propertyType) &&
                !this.isNullOrEmpty(this.marketName) &&
                this.unitsTotal > 0 &&
                this.propertiesTotal > 0 &&
                this.totalNumberBoardMeetingAttendedPerYear > 0;
        };
        UserInfo.prototype.copyFrom = function (updated) {
            this.name = updated.name;
            this.email = updated.email;
            this.marketName = updated.marketName;
            this.city = updated.city;
            this.propertyType = updated.propertyType;
            this.propertyName = updated.propertyName;
            this.unitsTotal = updated.unitsTotal;
            this.propertiesTotal = updated.propertiesTotal;
            this.totalNumberBoardMeetingAttendedPerYear = updated.totalNumberBoardMeetingAttendedPerYear;
        };
        return UserInfo;
    }());
    survey.UserInfo = UserInfo;
    var AdminInfo = (function (_super) {
        __extends(AdminInfo, _super);
        function AdminInfo() {
            _super.call(this);
            this.managersNumber = 0;
        }
        AdminInfo.prototype.validate = function () {
            return _super.prototype.validate.call(this) && this.managersNumber > 0 &&
                !this.isNullOrEmpty(this.supervisorName);
        };
        return AdminInfo;
    }(UserInfo));
    survey.AdminInfo = AdminInfo;
    var AssistantInfo = (function (_super) {
        __extends(AssistantInfo, _super);
        function AssistantInfo() {
            _super.call(this);
            this.managersNumber = 0;
        }
        AssistantInfo.prototype.validate = function () {
            return _super.prototype.validate.call(this) && this.managersNumber > 0 &&
                !this.isNullOrEmpty(this.supervisorName);
        };
        return AssistantInfo;
    }(UserInfo));
    survey.AssistantInfo = AssistantInfo;
    var ManagerInfo = (function (_super) {
        __extends(ManagerInfo, _super);
        function ManagerInfo() {
            _super.call(this);
        }
        ManagerInfo.prototype.validate = function () {
            return _super.prototype.validate.call(this) && !this.isNullOrEmpty(this.rdSupervisorName) && !this.isNullOrEmpty(this.vpSupervisorName);
        };
        return ManagerInfo;
    }(UserInfo));
    survey.ManagerInfo = ManagerInfo;
})(survey || (survey = {}));
//# sourceMappingURL=survey.userInfo.js.map