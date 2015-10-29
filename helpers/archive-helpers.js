var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http-request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(fileName, callback) {
  //for worker
  //open file
  //read all data
  //put data into an array split by new lines
  //perform callback on each element
  
  fs.readFile(fileName, function(err, data) {
    if(err) {
      throw err
    } else {
      var lines = data.toString().split('\n');
      for(var i = 0; i < lines.length; i++){
        callback(lines[i]);
      }    
    }
  });
};

exports.isUrlInList = function(url, success, failure) {
  fs.readFile('./archives/sites.txt', function(err, data) {
    if(err) {
      throw err
    } else {
      var lines = data.toString().split('\n');
      for(var i = 0; i < lines.length; i++){
        if(url === lines[i]) {
          success();
          return;
        }
      }    
    }
    failure(url);
  });
};

exports.addUrlToList = function(url) {
  var toAppend = '\n' + url;
  fs.appendFile(exports.paths.list, toAppend, function(err){
    if(err) {
      throw err;
    } else {
    }
  })
};

exports.isUrlArchived = function(url, success, failure) {
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    
    if(err) {
      throw err;
    } else {

      for(var i = 0; i < files.length; i++) {
        if(url === files[i]) {
          success(url);
          return;
        }
      }
      failure(url);
    }

  })
};

exports.downloadUrls = function(url) { 
  http.get(url,
    function (err, res) {
      if(err) {
        throw err;
      } 
      
      var file = exports.paths.archivedSites + '/' + url;
      fs.writeFile(file, res.buffer.toString(), function (err, res) {
        if(err) {
          throw err;
        }
      } )
    });
};
