getUser(1, user => {
  // console.log(user.username);

  getRepositories(user.username, repos => {
    // console.log(repos);

    getCommits(repos, commits => {
      console.log(user.username);
      console.log(repos);
      console.log(commits);
    });
  });
});

//

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading user from database...");
    callback({ id: id, username: "pedrobritto" });
  }, 1000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Fetching user's repositories...");
    callback(["repo1", "repo2", "repo3"]);
  }, 1000);
}

function getCommits(repos, callback) {
  setTimeout(() => {
    console.log("Fetching repo's commits...");
    callback(["81d2bdd", "bf12791", "3090f49"]);
  }, 0);
}
