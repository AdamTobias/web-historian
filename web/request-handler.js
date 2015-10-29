var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers');
var _ = require('underscore');
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
      //check list for site
        //if not in list, add the website to the /archives/sites.txt
      //if in list send them to loading.html?

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

        archive.isUrlArchived(url, 
          function ArchiveSuccess(url){
            console.log('its happening! url = ' + url);
            sendResponse(res, 302, url);
          }, function ArchiveFailure(url){
            
            archive.isUrlInList(url , 
              function ListSuccess(){
                console.log('redirect to loading.html');
                sendResponse(res, 302);
          
              }, function ListFailure(url){
                archive.addUrlToList(url)
                console.log('added, redirecting')
                sendResponse(res, 302);
              });
          })
      })
    } else if (req.method === 'GET') {
        var url = req.url.slice(1)

        if(url === 'loading.html'){
          headers.serveAssets(res, url);
        } else {

          archive.isUrlArchived(url, 
            function servePage(){
              headers.serveAssets(res, url)
            },
           function notFound(){
            res.writeHead(404, headers.headers);
            res.end();
          });
        }
    }

};

var sendResponse = function(res, statusCode, path){
  var url = path || 'loading.html';
  res.writeHead(statusCode, {Location: 'http://localhost:8080/' + url});
  res.end();
}

// var writeURL = function(){
//   //code to write URL
// }
