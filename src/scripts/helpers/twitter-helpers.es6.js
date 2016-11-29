'use strict';

/**
* Adds an eventl listener for changes made within the post input box.
* When a change is made the updateChar() method is called to update the DOM
*/
let registerTwiiterInputDetection = () => {

  app.shell.addEventListener('keyup', e => {
    if (e.target.id === 'message') {
      updateCharCount(e.target.value);
    }
  });
};

/**
* Updates the charachter count for the post textarea
* @param {String} text The text which should be checked for length
*/
let updateCharCount = text => {
  let remaining = getCharCount(text);
  document.getElementById('tweet-char-remaining').innerHTML = remaining;
};

/**
* Gets the remaining charachter count for a post
* @param {String} text The text whos length shold be checked
* @return {Int} The difference between the input length and twitter max length
*/
let getCharCount = text => {
  return 140 - twttr.txt.getTweetLength(text);
};

/**
* Updates the html for a post with twitter stuff. It looks for @ mentions and
* hash tags (#) and links to the appropriate twitter page. It also adds a target
* of _blank to allow opening up in a new window.
* @param {String} entry The html string which needs links added too
*/
let linkTweets = entry => {
  entry.innerHTML = twttr.txt.autoLink(entry.innerHTML);
  entry.querySelectorAll('a').forEach( link => {
    link.setAttribute('target', '_blank');
  });
};
