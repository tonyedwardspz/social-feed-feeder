'use strict';

let assert = require('assert');
let fs = require('fs');
let vm = require('vm');
let code = fs.readFileSync('./src/scripts/helpers/view-helpers.es6.js');
vm.runInThisContext(code);

describe('View Helpers', () => {
  describe('#getBreadcrumbs(view)', () => {

    it('Returns the campaign_index breadcrumb', () => {
      let expectedHTML = `<a href="#" id="dashboard_index" class="breadcrumb">Dashboard</a>&nbsp;&raquo;&nbsp;Campaigns`;
      assert.equal(expectedHTML, getBreadcrumbs('campaign_index'));
    });

    it('Returns the breadcrumb for the campaign view show', () => {
      let expectedHTML = `<a href="#" id="dashboard_index" class="breadcrumb">Dashboard</a>&nbsp;&raquo;&nbsp;\n              <a href="#" id="campaign_index" class="breadcrumb">Campaigns</a>&nbsp;&raquo;&nbsp;Campaign`;
      assert.equal(expectedHTML, getBreadcrumbs('campaign_show'));
    });

  });
});
