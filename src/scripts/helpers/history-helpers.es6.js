'use strict';

/**
* Sets up a listener on the popstate event which fires whenever the browsers
* back button is pressed.
*/
let setupPopStateListener = () => {
  console.log('[History] Setup pop state listener');
  window.onpopstate = event => {
    loadContent(event.state);
  };
};

/**
* Attempts to update the view when called afer a popstate event. It splits
* the new url in the browser address bar and calls the appropriate action
* @param {State} state The browser history state object
*/
let loadContent = (state) => {
  try {
    let url = window.location.href.split('/');
    let controller = url[url.length - 1].split('_')[0];
    let action = url[url.length - 1].split('_')[1];

    if (state.id === null){
      window.app[controller + 'Controller'][action](false);
    } else {
      window.app[controller + 'Controller'][action](history.state.id, false);
    }
  } catch (error) {
    console.warn('There was an error loading content from the browsers history',
                  error);
  }
};

/**
* Updates the browser's history
* @param {String} view '_' deliminated string of controller/action
* @param {String} id The id object relating to the contoller/action
* @callback Trigger a Google Analytics event, passing in the current view
*/
let updateBrowserHistory = (view, id, cb) => {
  let state = {
    id: id,
    controller: view.split('_')[0],
    action: view.split('_')[1]
  };

  history.pushState(state, 'Random Page', view);
  cb(view);
};
