'use strict';

/**
* Generates a breadcrumb trail for the current view
* @param {String} view The current view being generated
* @param {Array.String} [ids] An heirrarchical array of ids leading to
* current view
* @return {String} The html string containing the breadcrumb trail
*/
let getBreadcrumbs = (view, ids = null) => {
  let breadcrumb = `<a href="#" id="dashboard" class="breadcrumb">Dashboard</a>`;

  if (view === 'campaign_index') {
    breadcrumb += `&nbsp;&raquo;&nbsp;Campaigns`;
  } else if (view !== 'dashboard'){
    breadcrumb += `&nbsp;&raquo;&nbsp;
              <a href="#" id="campaign_index" class="breadcrumb">Campaigns</a>`;
  }

  if (view === 'campaign_show') {
    breadcrumb += `&nbsp;&raquo;&nbsp;Campaign`;
  } else if (view === 'campaign_edit') {
    breadcrumb += `&nbsp;&raquo;&nbsp;Edit Campaign`;
  } else if (view === 'campaign_new') {
    breadcrumb += `&nbsp;&raquo;&nbsp;New Campaign`;
  }

  if (view.includes('bucket') || view.includes('post')){
    breadcrumb += `&nbsp;&raquo;&nbsp;
                   <a href="#" class="campaign_show" id="breadcrumb"
                   data-id="${ids[0]}">Campaign</a>`;
  }

  if (view === 'bucket_show') {
    breadcrumb += `&nbsp;&raquo;&nbsp;Bucket`;
  } else if (view === 'bucket_edit') {
    breadcrumb += `&nbsp;&raquo;&nbsp;Edit Bucket`;
  } else if (view === 'bucket_new') {
    breadcrumb += `&nbsp;&raquo;&nbsp;New Bucket`;
  }

  if (view.includes('post')){
    breadcrumb += `&nbsp;&raquo;&nbsp;
                   <a href="#" class="bucket_show" id="breadcrumb"
                   data-id="${ids[1]}">Bucket</a>`;
  }

  if (view === 'post_edit') {
    breadcrumb += `&nbsp;&raquo;&nbsp;Edit Post`;
  } else if (view === 'post_new') {
    breadcrumb += `&nbsp;&raquo;&nbsp;New Post`;
  }

  return breadcrumb;
};
