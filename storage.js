class Storage {
  static getSearchedUsersFromStorage() {
    // Tüm Kullanıcıları Al

    let users;

    if (localStorage.getItem("searched") === null) {
      users = [];
    } else {
      users = JSON.parse(localStorage.getItem("searched"));
    }
    return users;
  }
  static addSearchedUserToStorage(username) {
    // Kullanıcı Ekle
    let users = this.getSearchedUsersFromStorage();

    //  IndexOf
    if (users.indexOf(username) === -1) {
      users.push(username);
    }
    localStorage.setItem("searched", JSON.stringify(users));
  }
  static clearAllSearchedUsersFromStorage() {
    //  Tüm Kullanıcıları Sil
    localStorage.removeItem("searched");
  }

  static deleteUserFromStorage(username) {
    let users = this.getSearchedUsersFromStorage();
    users = users.filter((user) => user !== username);
    localStorage.setItem("searched", JSON.stringify(users));
  }
}
