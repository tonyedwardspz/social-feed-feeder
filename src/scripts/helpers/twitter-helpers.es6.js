'use strict';

let registerTwiiterInputDetection = () => {

  app.shell.addEventListener('keyup', e => {

    if (e.target.id === 'message') {
      updateCharCount(e.target.value);
    }

  });
};

let updateCharCount = text => {
  let remaining = getCharCount(text);
  document.getElementById('tweet-char-remaining').innerHTML = remaining;
};

let getCharCount = text => {
  return 140 - twttr.txt.getTweetLength(text);
};

let linkTweets = entry => {
  entry.innerHTML = twttr.txt.autoLink(entry.innerHTML);
  entry.querySelectorAll('a').forEach( link => {
    link.setAttribute('target', '_blank');
  });
};
