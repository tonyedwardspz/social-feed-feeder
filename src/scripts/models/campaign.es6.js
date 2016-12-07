'use strict';

/** A class representing a users campaign */
class Campaign {
  /**
  * @param {String} name The title of the bucket
  * @param {String} description The description of the bucket
  * @param {String} expiry The date string to expire the bucket on
  * @param {Integer} dailyPosts The maximun posts from the bucket to post
  * @param {String} [userID=app.user.id] The id of user this bucket belongs to
  * @param {String} [campaignID=randomString()] The ID of the campaign
  */
  constructor(name, description, expiry, dailyPosts, userID = app.user.id,
              campaignID = randomString()) {
    this.campaignID = campaignID;
    this.name = name;
    this.description = description;
    this.expiry = expiry;
    this.dailyPosts = dailyPosts;
    this.userID = userID;
  }

  /** Returns ID of the current campaign object */
  get id(){
    return this.campaignID;
  }

  /** Returns all buckets for the current campaign */
  get buckets() {
    let buckets = [];

    app.user.buckets.forEach(bucket => {
      if (bucket.campaignID === this.campaignID) {
        buckets.push(bucket);
      }
    });

    return buckets;
  }

  /**
  * Updates the current campaign from the passed form object
  * @param {Form} form The form the user has edited
  */
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

  /**
  * Returns all campaigns for the apps user
  * @static
  */
  static getAllCampaigns() {
    return app.user.campaigns;
  }

  /**
  * Saves the supplied campain under the apps user object
  * @param {Array.Campaign} campaigns The campaigns to save to the local app
  * @static
  */
  static setCampaigns(campaigns) {
    app.user.campaigns = campaigns;
  }

  /**
  * Finds a campaign object fromt the supplied array for the provided ID
  * @param {String} id The id of the campaign to find
  * @param {Array.Campaign} campaigns An array of campaigns to search
  * @return {Campaign} The found campaign
  * @static
  */
  static getByID(id, campaigns){
    let thisCampaign = {};
    campaigns.forEach(campaign => {
      if (campaign.campaignID === id) {
        thisCampaign = campaign;
      }
    });

    return thisCampaign;
  }

  /**
  * Finds the number of posts for the current campaigns buckets
  * @return {Integer} The total
  */
  getNumberOfPosts() {
    let total = 0;

    this.buckets.forEach(bucket => {
      total += bucket.posts.length;
    });

    return total;
  }

  /**
  * Creates a new camapign object from the provided form
  * @param {Form} form The form the generate a new campaign from
  * @return {Campaign} The created campaign
  * @static
  */
  static createFromForm(form) {
    return new Campaign(
      form.name.value.trim(),
      form.description.value.trim(),
      form.expiry.value.trim(),
      form.dailyPosts.value.trim()
    );
  }

  /**
  * Creates campaign objects from the JSON data returned from the server
  * @param {Array.JSON} campaigns An array JSON campaigns to convert
  * @return {Array.Campaign} The generated camapign objects
  * @static
  */
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

  /**
  * Removes a campaign from the local application. The loop counts backwards to
  * avoid issues deleting whilst itterating. Thn saves the updated array under
  * the user object by calling the setCampaigns method.
  * @param {String} id The id of the campaign to remove
  * @static
  */
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
