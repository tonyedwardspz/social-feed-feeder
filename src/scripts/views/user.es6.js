class UserView {
  constructor(){

  }

  show(user) {
    return `<h1>Show User<h1>
            <p>This is the show user view<p>`;
  }

  edit(user) {
    return `<h1>Edit User<h1>
            <p>This is view to edit the user<p>`;
  }
}
