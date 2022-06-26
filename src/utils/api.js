//const id = "ID";
//const sec = "Secret ID";
//const params = `?client_id=${id}&client_secret=${sec}`;
const params = '?';

function getErrorMessage(message, username) {
  if (message === 'Not Found') {
    return `${username} doesn't exist`;
  }
  return message;
}

function getProfile(username) {
  return fetch(`https://api.github.com/users/${username}${params}`)
    .then((res) => res.json())
    .then((profile) => {
      if (profile.message) {
        throw new Error(getErrorMessage(profile.message, username));
      }
      return profile;
    });
}

function getRepos(username) {
  return fetch(
    `https://api.github.com/users/${username}/repos${params}&per_page=100`
  )
    .then((res) => res.json())
    .then((repos) => {
      if (repos.message) {
        throw new Error(getErrorMessage(repos.message, username));
      }
      return repos;
    });
}

function getStarCount(repos) {
  return repos.reduce(
    (total, { stargazers_count }) => total + stargazers_count,
    0
  );
}
function calculateScore(followers, repos) {
  return followers * 3 + getStarCount(repos);
}

function getUserData(username) {
  return Promise.all([getProfile(username), getRepos(username)]).then(
    ([profile, repos]) => ({
      profile,
      score: calculateScore(profile.followers, repos),
    })
  );
}

function sortResult(result) {
  return result.sort((a, b) => b.score - a.score);
}

export function battle(players) {
  console.log(players);
  return Promise.all([getUserData(players[0]), getUserData(players[1])]).then(
    (result) => sortResult(result)
  );
}

export function fetchPopularRepos(language) {
  const endpoint = window.encodeURI(
    `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
  );
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => {
      if (!data.items) {
        throw new Error(data.message);
      }
      return data.items;
    });
}
