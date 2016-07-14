var survey;
(function (survey) {
    var Market = (function () {
        function Market(marketName) {
            this.name = marketName;
        }
        return Market;
    }());
    survey.Market = Market;
})(survey || (survey = {}));
