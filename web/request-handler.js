var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!

exports.handleRequest = function (req, res) {

  console.log('Incoming ' + req.method + ' request to ' + req.url);

  //User makes a POST request
    //is the website they are looking for present in /archives/sites?
      //if so, redirect them to http://localhost:8080/**URL**
        //how to redirect?
          //window.location.href = 'http://localhost:8080/www.test.com', followed by res.end??
          //res.end('<script>window.location.href = "http://localhost:8080/www.test.com"</script>');??
      //hopefully this will automatically make a get request for that URL 
    //if not
      //add the website to the /archives/sites.txt
      //send them to loading.html?

  //User makes a GET request (by loading a subpage of the localhost)
    //is the website they are looking for present in /archives/sites?
     //if so, read that file and send the client that data
    //if not, say 'we don't have that' and give them a 404

    if(req.method === 'POST') {
      var data = ''
      req.on('data', function(chunk) {
        data += chunk;
      })

      req.on('end', function() {
        var url = data.slice(4)

        //console.log(archive.isUrlInList(url), writeURL, failFunction);
        archive.addUrlToList(url)
      })
      
    }
  

};

// var writeURL = function(){
//   //code to write URL
// }
