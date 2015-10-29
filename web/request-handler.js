var path = require('path');
var archive = require('../helpers/archive-helpers');
var headers = require('./http-helpers');
var _ = require('underscore');
// require more modules/folders here!


exports.handleRequest = function (req, res) {

  console.log('Incoming ' + req.method + ' request to ' + req.url);

    if(req.method === 'POST') {
      var data = ''
      req.on('data', function(chunk) {
        data += chunk;
      })

      req.on('end', function() {
        var url = data.slice(4)

        archive.isUrlArchived(url, 
          function ArchiveSuccess(url){
            sendResponse(res, 302, url);
          }, function ArchiveFailure(url){
            
            archive.isUrlInList(url , 
              function ListSuccess(){
                sendResponse(res, 302);
          
              }, function ListFailure(url){
                archive.addUrlToList(url)
                sendResponse(res, 302);
              });
          })
      })
    } else if (req.method === 'GET') {
        var url = req.url.slice(1)

        if(url === 'loading.html' || url === ''){
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
