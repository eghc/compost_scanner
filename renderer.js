

//function that handles the reading of files and merge in value
    //read from file and get a string
        //merge values in to string
var fs = require("fs");

function mergeValues(values, content){
    //Cycle over keys
    for(var key in values){
        content = content.replace("{{"+ key +"}}", values[key]);
    }

    return content;
}

function view(templateName, values, response){
    //read from the template files
    var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding:"utf8"});

    //insert values into content
    fileContents = mergeValues(values, fileContents);

    //write out to the response
    response.write(fileContents);

}

module.exports.view = view;