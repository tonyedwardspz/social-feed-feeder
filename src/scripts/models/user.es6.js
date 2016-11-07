class User {
  constructor() {
    this.id = getCookie('user_id');
    this.name = decodeURI(getCookie('user_name'));
  }
}
