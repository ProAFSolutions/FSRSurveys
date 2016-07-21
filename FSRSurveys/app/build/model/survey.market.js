var survey;
(function (survey) {
    var Market = (function () {
        function Market(name, country) {
            this.name = name;
            this.country = country;
        }
        return Market;
    }());
    survey.Market = Market;
})(survey || (survey = {}));
//# sourceMappingURL=survey.market.js.map