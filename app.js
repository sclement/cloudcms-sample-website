var server = require("cloudcms-server/server");
var path = require("path");
var fs = require("fs");

var customDustHelpers = require("./lib/dust-helpers.js");
var customRoutes = require("./routes/routes.js");

//Uncomment to load dust-helper tags from directory instead of lib/dust-helpers.js
//var customTags = require("./tags/index.js");

var util = require("./lib/util.js");

/**
 * Custom Dust Helpers
 */
server.dust(customDustHelpers);

//Uncomment to load dust-helper tags from directory instead of lib/dust-helpers.js
//server.dust(customTags);

/**
 * Custom Routes
 */
server.routes(customRoutes);

/**
 * This gets displayed once the server starts up.
 */
server.report(function(callback) {

    var cpuCount = require('os').cpus().length;

    // provide some debug info
    console.log("");
    console.log("Cloud CMS Sample App Started Up");
    console.log("");
    console.log("Node Version: " + process.version);
    console.log("Server Version: " + process.env.CLOUDCMS_APPSERVER_PACKAGE_VERSION);
    console.log("Server Mode: " + process.env.CLOUDCMS_APPSERVER_MODE);
    console.log("Server Base Path: " + process.env.CLOUDCMS_APPSERVER_BASE_PATH);
    console.log("Gitana Scheme: " + process.env.GITANA_PROXY_SCHEME);
    console.log("Gitana Host: " + process.env.GITANA_PROXY_HOST);
    console.log("Gitana Port: " + process.env.GITANA_PROXY_PORT);
    console.log("Temp Directory: " + process.env.CLOUDCMS_TEMPDIR_PATH);
    console.log("CPU Count: " + cpuCount);
    console.log("Store Configuration: " + process.env.CLOUDCMS_STORE_CONFIGURATION);
    console.log("Broadcast Provider: " + process.env.CLOUDCMS_BROADCAST_TYPE);
    console.log("Cache Provider: " + process.env.CLOUDCMS_CACHE_TYPE);
    console.log("LaunchPad Mode: " + process.env.CLOUDCMS_LAUNCHPAD_SETUP);
    console.log("Server mode: " + (process.env.NODE_ENV ? process.env.NODE_ENV : "development"));
    console.log("");
    console.log("Web Server: http://localhost:" + process.env.PORT);
    console.log("");

    callback();
});
/*
server.dust(function(app, dust, callback) {
    // utilities
    var support = require('cloudcms-server/duster/support')(dust);
    var end = support.end;
    // sample dust helper
    dust.helpers.sample = function(chunk, context, bodies, params)
    {
        return support.map(chunk, function (chunk) {
            // message
            var message = context.resolve(params.message);
            // write and end this chunk
            chunk.write(message);
            end(chunk);
        });
    };
    callback();
});
*/

var configFilePath = path.resolve(path.join(".", "sqs-config.json"));
var sqsConfig = null;
if (fs.existsSync(configFilePath)) {
	sqsConfig = JSON.parse(fs.readFileSync(configFilePath));
}

/**
 * Start the Server
 */
server.start({
    "setup": "single",
    "welcome": {
        "enabled": true,
        "file": "index.html"
    },
    "wcm": {
        "enabled": true,
        "cache": true
    },
    "serverTags": {
        "enabled": true
    },

    "autoRefresh": {
        "log": true
    },
    "perf": {
        "enabled": true,
        "paths": [{
            "regex": "/static/.*",
            "cache": {
                "seconds": 300
            }
        }]
    }
});
