console.log("before");

getUser(1, userObj => {
  getRepositories(userObj.username, repos => {
    console.log("repos", repos);
  });
});

console.log("after");

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
