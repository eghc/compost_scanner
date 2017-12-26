var Profile =require("./profile.js");
var querystring = require("querystring");
var renderer = require("./renderer.js");

var commonHeaders = {'Content-Type': 'text/html'};

//Handle the HTTP route GET and Post
function homeRoute(request, response){
    //if url == '/' && GET
    if(request.url =="/"){
        if(request.method.toLowerCase() === "get"){

        //show search
        response.writeHead(200, commonHeaders);
        renderer.view("header", {}, response);
        renderer.view("search", {}, response);
        renderer.view("footer", {}, response);
        response.end();
        }else{
        //if url =='/' && POST
            //get the post data from body
            request.on("data", function(postBody){

                //extract the username
                var query = querystring.parse(postBody.toString());

                //redirect to username
                response.writeHead(303, {"Location": "/"+query.username});
                response.end();
            });

        }
    }
}

//Handle HTTP route GET/:username
function userRoute(request, response){
    //if url =="/...."
    var username = request.url.replace("/", "");

    if(username.length > 0){
        //get json from Treehouse
            //on "end"
                //show profile
            //on "error"
                //show error
        response.writeHead(200, commonHeaders);
        renderer.view("header", {}, response);


        var studentProfile = new Profile(username);

        studentProfile.on("end", function(profileJSON){
            //show profile

            //store the values which we need
            var values = {
                avatarUrl: profileJSON.gravatar_url,
                username: profileJSON.profile_name,
                badges: profileJSON.badges.length,
                javascriptPoints: profileJSON.points.JavaScript
            }

            renderer.view("profile", values, response);
            renderer.view("footer", {}, response);
            response.end();

        });

        //on error
        studentProfile.on("error", function(error){
            //show error
            renderer.view("error", {errorMessage: error.message}, response);
            renderer.view("search", {}, response);
            renderer.view("footer", {}, response);
            response.end();
        });

    }
}

module.exports.home = homeRoute;
module.exports.user = userRoute;