'use strict';

var pushpad = require('pushpad');

class Notification {
  constructor() {
    this.pushPadProject = new pushpad.Pushpad({
      authToken: process.env.PUSHPAD_AUTH_TOKEN,
      projectId: process.env.PUSHPAD_PROJECT_ID
    });
  }

  get pushPadProject() {
    return this._pushPadProject;
  }

  set pushPadProject(project){
    this._pushPadProject = project;
  }

  getNewNotification() {
    return new pushpad.Notification({
      project: this.pushPadProject,
      body: this.notificationBody(), // max 120 characters
      title: this.notificationTitle() //  max 30 characters
    });
  }

  notificationBody() {
    let bodies = [
      'Fill your social media queue with just a couple of clicks',
      'Click here to schedule posts and send to buffer',
      'Send updates to buffer with just a couple of clicks',
      'Queue up today\'s social media posts in a flash',
      'You\'re a couple of clicks away from filling up your buffer account',
      'That came around quick! Top up your buffer feed now'
    ];
    return bodies[Math.floor(Math.random() * bodies.length)];
  }

  notificationTitle() {
    let titles = [
      'It\'s top up time',
      'Top up your queue',
      'Time to top up',
      'Schedule some posts'
    ];
    return titles[Math.floor(Math.random() * titles.length)];
  }

}

module.exports = new Notification();
