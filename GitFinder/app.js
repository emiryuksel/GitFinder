// Elementleri Seçme
const githubForm = document.getElementById("github-form");
const nameInput = document.getElementById("githubname");
const clearLastUsers = document.getElementById("clear-last-users");
const lastUsers = document.getElementById("last-users");
const github = new Github();
const ui = new UI();

eventListeners();

function eventListeners() {
  githubForm.addEventListener("submit", getData);
  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
  lastUsers.addEventListener("click", deleteSingleUser);
}

function getData(e) {
  let username = nameInput.value.trim();

  if (username === "") {
    alert("Lütfen geçerli bir kullanıcı adı girin.");
  } else {
    github
      .getGithubData(username)
      .then((response) => {
        if (!Storage.getSearchedUsersFromStorage().includes(username)) {
          ui.addSearchedUserToUI(username);
          Storage.addSearchedUserToStorage(username);
        }
        ui.showUserInfo(response.user);
        ui.showRepoInfo(response.repos);
      })
      .catch((err) => {
        ui.showError(err.message);
      });
  }

  ui.clearInput();
  e.preventDefault();
}

function clearAllSearched() {
  if (confirm("Emin misiniz?")) {
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchedFromUI();
  }
}

function getAllSearched() {
  let users = Storage.getSearchedUsersFromStorage();
  ui.loadAllSearchedUsers(users);
}

// Tek tek kullanıcı silmek için fonksiyon
function deleteSingleUser(e) {
  if (e.target.classList.contains("delete-user")) {
    const username = e.target.parentElement.textContent.trim();
    e.target.closest("li").remove();
    Storage.deleteUserFromStorage(username);
  }
}
