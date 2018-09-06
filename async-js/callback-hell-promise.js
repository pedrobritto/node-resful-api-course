// getUser(1, user => {
//   // console.log(user.username);

//   getRepositories(user.username, repos => {
//     // console.log(repos);

//     getCommits(repos, commits => {
//       console.log(user.username);
//       console.log(repos);
//       console.log(commits);
//     });
//   });
// });

getUser(1)
  .then(user => getRepositories(user.username))
  .then(repos => getCommits(repos[0]))
  .then(commits => console.log("Commits", commits))
  .catch(err => console.log(err));

//

function getUser(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Reading user from database...");
      resolve({ id: id, username: "pedrobritto" });
    }, 1000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching user's repositories...");
      resolve(["repo1", "repo2", "repo3"]);
    }, 1000);
  });
}

function getCommits(repos) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("Fetching repo's commits...");
      resolve(["81d2bdd", "bf12791", "3090f49"]);
    }, 0);
  });
}
