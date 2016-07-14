var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var survey;
(function (survey) {
    var UserInfo = (function () {
        function UserInfo() {
        }
        return UserInfo;
    }());
    var AdminInfo = (function (_super) {
        __extends(AdminInfo, _super);
        function AdminInfo() {
            _super.call(this);
        }
        return AdminInfo;
    }(UserInfo));
    survey.AdminInfo = AdminInfo;
    var ManagerInfo = (function (_super) {
        __extends(ManagerInfo, _super);
        function ManagerInfo() {
            _super.call(this);
        }
        return ManagerInfo;
    }(UserInfo));
    survey.ManagerInfo = ManagerInfo;
})(survey || (survey = {}));
