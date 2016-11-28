'use strict';

let setupPopStateListener = () => {
  console.log('[History] Setup pop state listener');
  window.onpopstate = function(event) {
    console.log('location: ' + document.location + ', state: ' + JSON.stringify(event.state));

    let state = event.state;

    loadContent(event);
  };
};

function loadContent(event) {
  let url = window.location.href.split('/');
  let controller = url[url.length - 1].split('_')[0];
  let action = url[url.length - 1].split('_')[1];

  if (event.state.id === null){
    window.app[controller + 'Controller'][action](false);
  } else {
    window.app[controller + 'Controller'][action](history.state.id, false);
  }
}
