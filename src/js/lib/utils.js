const utils = {
    getHashParameter: function(parameter) {
        let result = null;
        let tmp    = [];

        location.hash
            .substr(1)
            .split("&")
            .forEach(function (item) {
                tmp = item.split("=");
                if (tmp[0] === parameter) result = decodeURIComponent(tmp[1]);
            });

        return result;
    }
};

module.exports = utils;
