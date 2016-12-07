'use strict';

/** A class representing a users campaign */
class Campaign {
  constructor(name, description, expiry, dailyPosts, userID = app.user.id,
              campaignID = randomString()) {
    this.campaignID = campaignID;
    this.name = name;
    this.description = description;
    this.expiry = expiry;
    this.dailyPosts = dailyPosts;
    this.userID = userID;
  }

  get id(){
    return this.campaignID;
  }

  get buckets() {
    let buckets = [];

    app.user.buckets.forEach(bucket => {
      if (bucket.campaignID === this.campaignID) {
        buckets.push(bucket);
      }
    });

    return buckets;
  }

  updateFromForm(form) {
    this.name = form.name.value.trim();
    this.description = form.description.value.trim();
    this.expiry = form.expiry.value;
    this.dailyPosts = form.dailyPosts.value;

    app.user.campaigns.forEach(camp => {
      if (camp.campaignID === this.campaignID) {
        camp = this;
      }
    });
  }

  static getAllCampaigns() {
    return app.user.campaigns;
  }

  static setCampaigns(campaigns) {
    app.user.campaigns = campaigns;
  }

  // Search the users campaigns for the correct object
  static getByID(id, campaigns){
    let thisCampaign = {};
    campaigns.forEach(campaign => {
      if (campaign.campaignID === id) {
        thisCampaign = campaign;
      }
    });

    return thisCampaign;
  }

  getNumberOfPosts() {
    let total = 0;

    this.buckets.forEach(bucket => {
      total += bucket.posts.length;
    });

    return total;
  }

  // Create and return a new campaign from a passed form
  // Used during the creation of object from user input
  static createFromForm(form) {
    return new Campaign(
      form.name.value.trim(),
      form.description.value.trim(),
      form.expiry.value.trim(),
      form.dailyPosts.value.trim()
    );
  }

  // Converts an array of passed JSON objects into an array of
  // Campaign objects before returning.
  static extractCampaignData(campaigns){
    var sortedCampaigns = [];

    campaigns.forEach(campaign => {
      sortedCampaigns.push(new Campaign(
        campaign.name,
        campaign.description,
        campaign.expiry,
        campaign.dailyPosts,
        campaign.userID,
        campaign.campaignID
      ));
    });

    return sortedCampaigns;
  }

  static removeCampaign(id) {
    var campaigns = this.getAllCampaigns();

    for (let i = campaigns.length - 1; i >= 0; i--) {
      if (campaigns[i].id === id) {
        campaigns.splice(i, 1);
      }
    }

    this.setCampaigns(campaigns);
  }
}
