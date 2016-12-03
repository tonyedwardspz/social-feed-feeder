'use strict';

let assert = require('assert');
let fs = require('fs');
let vm = require('vm');
let code = fs.readFileSync('./public/scripts/app.js');
vm.runInThisContext(code);

describe('Campaign Controller', () => {
  describe('Class instantiation', () => {

    it('New class is instance of Campaign class', () => {
      let campaign = new CampaignController();
      assert.equal(campaign, campaign instanceof CampaignController);
    });

    // it('Returns the breadcrumb for the campaign view show', () => {
    //   let expectedHTML = `<a href="#" id="dashboard_index" class="breadcrumb">Dashboard</a>&nbsp;&raquo;&nbsp;\n              <a href="#" id="campaign_index" class="breadcrumb">Campaigns</a>&nbsp;&raquo;&nbsp;Campaign`;
    //   assert.equal(expectedHTML, getBreadcrumbs('campaign_show'));
    // });

  });
});
