// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.


fs.writeFile()
//this is a node server?

//html fetcher will check sites.txt for any new URLs (how do we know if they are new or not?)
  //if so, it will make a GET request to that URL
    //when the GET request succeeds, it will store the html data to a new file in archives/sites
  //if the GET fails
    //save some template 404 information in archives/sites/**URL**
  //will it then perform some operation to indicate that that site has been read from archives/sites.txt?
  //it could add some string to the text to say its been processed
  //or it could delete that string from the file



//the fetching of data needs to be triggered by CRON.  How does this work?
  //does the server run indefinitely and CRON triggers some function call to make it look for new URLs?
  //or does CRON boot up the server itself, and then the default 'look for URLs' code runs?


