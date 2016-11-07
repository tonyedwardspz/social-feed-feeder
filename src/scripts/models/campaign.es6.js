class Campaign {
  constructor(name, description, expiry, dailyPosts, userID = app.user.id) {
    this.campaignID = randomString();
    this.name = name;
    this.description = description;
    this.expiry = expiry;
    this.dailyPosts = dailyPosts;
    this.userID = userID;
  }

  static createFromForm(form) {
    return new Campaign(
      form.name.value,
      form.description.value,
      form.expiry.value,
      form.dailyPosts.value
    );
  }
}
