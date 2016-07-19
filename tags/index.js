var server = require("cloudcms-server/server");
/**
 * Custom dust tags.
 *
 * @type {Function}
 */
module.exports = function(app, dust, callback)
{
    console.log('set up helper');
    var filepaths = [
        "../../../tags/nyt"
    ];
    var dustsupport = require('cloudcms-server/duster/support')(server.dust);

    dustsupport.addHelpers(app, dust, filepaths, function() {
        callback();
    });
};
