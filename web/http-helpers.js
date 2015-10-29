var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.) 
  var location = archive.paths.archivedSites + '/' + asset;

  if(asset === 'loading.html'){
    location = archive.paths.siteAssets + '/loading.html';
  }

  console.log('location = ' + location);
  
  fs.readFile(location, function(error, content) {
    if(error){
      throw error;
    } else {
      res.writeHead(200, headers);
      res.end(content);  
    }
  });

};

  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

// As you progress, keep thinking about what helper functions you can put here!
