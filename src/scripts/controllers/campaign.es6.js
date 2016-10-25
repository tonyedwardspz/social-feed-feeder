'use strict';

class CampaignsController extends ApplicationController {
  constructor(database) {
    super(database);
    console.log('From Campaign Controller');
  }

  getAll() {
    this.db.retrieve('/campaigns', function(result){
      console.log('Result returned', result);
    });
  }

  createNew() {

  }

  delete() {

  }
}
