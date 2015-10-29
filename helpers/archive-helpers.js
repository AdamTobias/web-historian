var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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

exports.readListOfUrls = function() {
  //for worker
  fs.open('./archives/sites.txt', 'w+', function(err, fd) {
    if(err) {
      throw err
    }

  })
};

exports.isUrlInList = function(url, success, failure) {
  //server
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
  
  //return found;
};

exports.addUrlToList = function(url) {
  var toAppend = '\n' + url
 //fs.open('./archives/sites.txt', 'w', function(err, fd) {
  fs.appendFile('./archives/sites.txt', toAppend, function(err){
    if(err) {
      throw err;
    } else {
      console.log('success')
    }
  })
// })
};

exports.isUrlArchived = function(url, success, failure) {
  fs.readdir('./archives/sites', function(err, files) {
    
    if(err) {
      throw err;
    } else {

      for(var i = 0; i < files.length; i++) {
        if(url === files[i]) {
          console.log('url is archived');
          success(url);
          return;
        }
      }
      failure(url);
    }

  })
};

exports.downloadUrls = function() {
  //worker
};
