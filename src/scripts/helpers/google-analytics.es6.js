'use strict';

/**
* Sends a navigation event to Google Analytics.
* @param {String} view The current view url being displayed
* @todo Check that this reports correctly in the analytics dashboard
*/
let updateGoogleAnalytics = view => {
  ga('send', {
    hitType: 'event',
    eventCategory: 'Navigate',
    eventAction: view,
    eventLabel: `Navigate to ${view.split('_')[0]} : ${view.split('_')[1]}`
  });
};
