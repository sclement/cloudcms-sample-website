var util = require("../lib/util.js");
var cloudcmsUtil = require("cloudcms-server/util/util");
// var useragent = require('express-useragent');

module.exports = function(app, callback) {

    // app.use(useragent.express());

    app.use(getUserLocationHandler);

    callback();
};

var getUserLocationHandler = function(req, res, next) {
    next();
};
