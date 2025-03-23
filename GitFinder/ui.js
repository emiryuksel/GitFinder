class UI {
  constructor() {
    this.profileDiv = document.getElementById("profile");
    this.repoDiv = document.getElementById("repos");
    this.lastUsers = document.getElementById("last-users");
    this.inputField = document.getElementById("githubname");
    this.cardBody = document.querySelector(".card-body");
  }

  clearInput() {
    this.inputField.value = "";
  }

  showUserInfo(user) {
    this.profileDiv.innerHTML = `
      <div class="card card-body mb-3">
        <div class="row">
          <div class="col-md-4 text-center">
            <a href="${user.html_url}" target="_blank">
              <img class="img-fluid mb-2 rounded-3" src="${user.avatar_url}">
            </a>
            <hr>
            <h5 id="fullName"><strong>${user.name}</strong></h5>
            <hr>
            <p id="bio">${user.bio || "Biyografi yok"}</p>
          </div>
          <div class="col-md-8">
            <div class="d-flex justify-content-around align-items-center mb-3 p-3 bg-light rounded-3 shadow-sm">
              <div class="text-center">
                <h6 class="text-muted">Takipçi</h6>
                <p class="fw-bold fs-5">${user.followers}</p>
              </div>
              <div class="text-center">
                <h6 class="text-muted">Takip Edilen</h6>
                <p class="fw-bold fs-5">${user.following}</p>
              </div>
              <div class="text-center">
                <h6 class="text-muted">Repolar</h6>
                <p class="fw-bold fs-5">${user.public_repos}</p>
              </div>
            </div>
            <hr>
            <ul class="list-group">
              <li class="list-group-item borderzero">
                <img src="images/company.png" width="30px"> <span id="company">${
                  user.company || "Şirket bilgisi yok"
                }</span>
              </li>
              <li class="list-group-item borderzero">
                <img src="images/location.png" width="30px"> <span id="location">${
                  user.location || "Konum bilgisi yok"
                }</span>
              </li>
              <li class="list-group-item borderzero">
                <img src="images/mail.png" width="30px"> <span id="email">${
                  user.email || "E-posta bilgisi yok"
                }</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  showError(message) {
    const div = document.createElement("div");
    div.className = "alert alert-danger";
    div.textContent = message;

    // cardBody yerine mevcut DOM'daki uygun yere ekleyelim:
    const container = document.querySelector(".searchContainer");
    const searchCard = document.querySelector(".search");
    container.insertBefore(div, searchCard);

    setTimeout(() => {
      div.remove();
    }, 2000);
  }

  showRepoInfo(repos) {
    this.repoDiv.innerHTML = "";
    repos.forEach((repo) => {
      let repoElement = document.createElement("div");
      repoElement.classList.add(
        "repo-item",
        "d-flex",
        "justify-content-between",
        "align-items-center",
        "p-3",
        "mb-3",
        "bg-white",
        "rounded-3",
        "shadow-sm"
      );

      repoElement.innerHTML = `
        <div class="repo-name">
          <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        </div>
        <div class="repo-buttons d-flex gap-3">
          <button class="btn btn-secondary">
            Starlar <span class="badge badge-light">${repo.stargazers_count}</span>
          </button>
          <button class="btn btn-info">
            Forklar <span class="badge badge-light">${repo.forks_count}</span>
          </button>
        </div>
      `;

      this.repoDiv.appendChild(repoElement);
    });
  }

  addSearchedUserToUI(username) {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.style =
      "border-radius: 8px; background: white; box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 6px; margin-bottom: 8px;";

    li.innerHTML = `
      <span class="w-100 d-flex justify-content-between align-items-center">
        ${username}
        <i class="fa-solid fa-xmark text-danger delete-user" style="cursor:pointer;"></i>
      </span>
    `;

    this.lastUsers.appendChild(li);
  }

  loadAllSearchedUsers(users) {
    this.lastUsers.innerHTML = "";
    users.forEach((user) => this.addSearchedUserToUI(user));
  }

  clearAllSearchedFromUI() {
    while (this.lastUsers.firstElementChild !== null) {
      this.lastUsers.removeChild(this.lastUsers.firstElementChild);
    }
  }
}
