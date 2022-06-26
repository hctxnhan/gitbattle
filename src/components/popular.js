import React from "react";
import PropTypes from "prop-types";
import { fetchPopularRepos } from "../utils/api";
import Card from "./card";
import Loading from "./loading";
import Tooltip from "./tooltip";
import {
  FaUser,
  FaStar,
  FaCodeBranch,
  FaExclamationTriangle,
} from "react-icons/fa";

function LanguageNav({ selected, onUpdateLanguage }) {
  const languages = ["All", "Javascript", "Ruby", "Java", "CSS", "Python"];
  return (
    <ul className="popular flex-center">
      {languages.map((language) => (
        <li
          style={selected === language ? { color: "#d0021b" } : null}
          onClick={() => onUpdateLanguage(language)}
          className="popular__item"
          key={language}
        >
          <a>{language}</a>
        </li>
      ))}
    </ul>
  );
}
LanguageNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired,
};

function ReposGrid({ repos }) {
  return (
    <div className="grid space-around">
      {repos.map((repo, index) => {
        const { owner, html_url, stargazers_count, forks, open_issues } = repo;
        const { login, avatar_url } = owner;
        return (
          <div key={html_url}>
            <Card
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
            >
              <ul className="card-list">
                <li>
                  <Tooltip text="Github's username">
                    <FaUser color="rgb(255, 191, 116)" size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color="rgb(255, 215, 0)" size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color="rgb(129, 195, 245)" size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color="rgb(241, 138, 147)" size={22} />
                  {open_issues.toLocaleString()} open
                </li>
              </ul>
            </Card>
          </div>
        );
      })}
    </div>
  );
}
ReposGrid.propTypes = {
  repos: PropTypes.array.isRequired,
};

export default function Popular() {
  const [selectedLanguage, setSelectedLanguage] = React.useState("All");
  const initialState = {
    error: null,
  };
  const [state, dispatch] = React.useReducer(popularReducer, initialState);

  const isLoading = () => !state[selectedLanguage] && state.error === null;

  const fetchedLanguages = React.useRef([]);

  React.useEffect(() => {
    if (!fetchedLanguages.current.includes(selectedLanguage)) {
      fetchedLanguages.current.push(selectedLanguage);

      fetchPopularRepos(selectedLanguage)
        .then((repos) => dispatch({ type: "success", selectedLanguage, repos }))
        .catch((error) => dispatch({ type: "error", error }));
    }
  }, [state, selectedLanguage]);

  return (
    <React.Fragment>
      <LanguageNav
        selected={selectedLanguage}
        onUpdateLanguage={setSelectedLanguage}
      />
      {isLoading() && <Loading text="Fetching repos" />}
      {state.error && <p className="center-text error">{state.error}</p>}
      {state[selectedLanguage] && <ReposGrid repos={state[selectedLanguage]} />}
    </React.Fragment>
  );
}

function popularReducer(state, action) {
  switch (action.type) {
    case "success":
      return {
        ...state,
        [action.selectedLanguage]: action.repos,
        error: null,
      };
    case "error":
      return {
        ...state,
        error: action.error.message,
      };
    default:
      throw new Error("That action type isn't supported");
  }
}
