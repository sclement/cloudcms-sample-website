var util = require("./util.js");
var cloudcmsUtil = require("cloudcms-server/util/util");


// var country = require("node-country");

module.exports = function(app, dust, cb) {

    var support = require('cloudcms-server/duster/support')(dust);
    //var end = support.end;

    // helper functions
    var isDefined = support.isDefined;
    //var resolveVariables = support.resolveVariables;
    var map = support.map;
    var end = support.end;

    dust.helpers.selectCarousel = function (chunk, context, bodies, params) {
        return support.map(chunk, function (chunk) {
            var req = context.get("req");
            var newContext = context.push({
                "useragent": req.useragent,
                "user_agent": req.headers['user-agent'],
                "accept_language": req.headers['accept-language']
            });

            chunk.render(bodies.block, newContext);
            end(chunk, context);
        });
    };

    //Example of adding another helper directly, as opposed to loading from the tags directory.
    dust.helpers.nytEvents = function(chunk, context, bodies, params)
    {
        params = params || {};

        var latitude = dust.helpers.tap(params.latitude, chunk, context);
        var longitude = dust.helpers.tap(params.longitude, chunk, context);
        var radius = dust.helpers.tap(params.radius, chunk, context);
        if (!radius)
        {
            radius = 1000;
        }
        var text = dust.helpers.tap(params.text, chunk, context);
        var limit = dust.helpers.tap(params.limit, chunk, context);
        if (isDefined(limit))
        {
            limit = parseInt(limit);
        }
        var filter = dust.helpers.tap(params.filter, chunk, context)

        var filters = null;
        if (filter)
        {
            filter = filter.toLowerCase();
        }
        if (filter === "broadway")
        {
            filters = 'category:"Broadway"';
        }
        if (filter === "pick")
        {
            filters = "times_pick:true";
        }

        return map(chunk, function(chunk) {
            setTimeout(function() {

                var request = require("request");
                var API_KEY = "3d8d573ec0ae966ea57245357cfcf57f:1:70698955";

                var url = "http://api.nytimes.com/svc/events/v2/listings.json?api-key=" + API_KEY;
                if (latitude && longitude)
                {
                    var latLong = latitude + "," + longitude;
                    url += "&ll=" + latLong;
                    url += "&radius=" + radius;
                }

                if (text)
                {
                    url += "&query=" + text;
                }

                if (isDefined(limit))
                {
                    url += "&limit=" + limit;
                }

                if (filters)
                {
                    url += "&filters=" + filters;
                }

                //console.log("URL:" + url);

                var request = require("request");
                request(url, function (error, response, body) {

                    if (error || response.statusCode !== 200)
                    {
                        if (error) {
                            console.log("ERROR: " + error);
                        }

                        if (response.statusCode !== 200) {
                            console.log("STATUS CODE: " + response.statusCode);
                        }

                        chunk.write("There was an error loading this section");
                        end(chunk);

                        return;
                    }

                    var json = JSON.parse(body);
                    console.log("BODY: " + JSON.stringify(json, null, "  "));

                    var resultObject = {
                        "rows": json.results
                    };
                    var newContext = context.push(resultObject);

                    chunk.render(bodies.block, newContext);
                    end(chunk, context);
                });
            });
        });
    };

    return cb();
};
