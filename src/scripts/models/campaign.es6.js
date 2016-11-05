class Campaign {
  constructor(name, description, expiry, dailyPosts) {
    this.name = name;
    this.description = description;
    this.expiry = expiry;
    this.dailyPosts = dailyPosts;
  }

  static createFromForm(form) {
    console.log(form.name.value);

    return new Campaign(
      form.name.value,
      form.description.value,
      form.expiry.value,
      form.dailyPosts.value
    );
  }
}
