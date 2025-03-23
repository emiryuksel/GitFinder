class Github {
  constructor() {
    this.client_id = "";
    this.client_secret = "";
    this.per_page = 100;
    this.sort = "created: asc";
  }

  async getGithubData(username) {
    const userResponse = await fetch(
      `https://api.github.com/users/${username}`
    );
    const repoResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${this.per_page}&sort=${this.sort}`
    );

    if (userResponse.status === 404) {
      throw new Error("Kullanıcı bulunamadı!");
    }

    const userData = await userResponse.json();
    const repoData = await repoResponse.json();

    return {
      user: userData,
      repos: repoData,
    };
  }
}
