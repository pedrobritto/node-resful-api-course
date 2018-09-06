getUser(1, getRepositories);

//

function getRepositories(user) {
  getRepositories(user.username, getCommits);
}

function getCommits(repos) {
  getCommits(repos, displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}
