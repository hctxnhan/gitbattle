import React from "react";

import {
  FaUserFriends,
  FaFighterJet,
  FaTrophy,
  FaTimesCircle,
} from "react-icons/fa";
import PropTypes from "prop-types";
import ThemeContext from "../contexts/theme";
import { Link } from "react-router-dom";

function InstructionItem({ header, icon }) {
  return (
    <div className="instructions__item">
      <h3 className="header-sm">{header}</h3>
      {icon}
    </div>
  );
}

function Instructions() {
  const theme = React.useContext(ThemeContext);
  return (
    <div className="instructions">
      <h1 className="center-text header-lg">Instructions</h1>
      <div className="container-sm grid center-text instructions__list">
        <InstructionItem
          header="Enter two Github users"
          icon={
            <FaUserFriends
              className={`bg-${theme}`}
              color="rgb(255, 191, 116)"
              size={140}
            />
          }
        />
        <InstructionItem
          header="Battle"
          icon={
            <FaFighterJet
              className={`bg-${theme}`}
              color="#727272"
              size={140}
            />
          }
        />

        <InstructionItem
          header="See the winners"
          icon={
            <FaTrophy
              className={`bg-${theme}`}
              color="rgb(255, 215, 0)"
              size={140}
            />
          }
        />
      </div>
    </div>
  );
}

export default function Battle() {
  const [playerOne, setPlayerOne] = React.useState(null);
  const [playerTwo, setPlayerTwo] = React.useState(null);

  const handleSubmit = (id, player) =>
    id === "playerOne" ? setPlayerOne(player) : setPlayerTwo(player);
  const handleReset = (id) =>
    id === "playerOne" ? setPlayerOne(null) : setPlayerTwo(null);

  return (
    <React.Fragment>
      <Instructions />
      <div className="players-container">
        <div className="row space-around">
          {playerOne === null ? (
            <PlayerInput
              label="Player One"
              onSubmit={(player) => handleSubmit("playerOne", player)}
            />
          ) : (
            <PlayerPreview
              username={playerOne}
              onReset={() => handleReset("playerOne")}
              label="Player One"
            />
          )}
          {playerTwo === null ? (
            <PlayerInput
              label="Player Two"
              onSubmit={(player) => handleSubmit("playerTwo", player)}
            />
          ) : (
            <PlayerPreview
              username={playerTwo}
              onReset={() => handleReset("playerTwo")}
              label="Player Two"
            />
          )}
        </div>
        {playerOne && playerTwo && (
          <Link
            className={`btn btn--dark btn--space`}
            to={{
              pathname: "/battle/results",
              search: `?playerOne=${playerOne}&playerTwo=${playerTwo}`,
            }}
          >
            Battle
          </Link>
        )}
      </div>
    </React.Fragment>
  );
}

function PlayerInput({ onSubmit, label }) {
  const [username, setUsername] = React.useState("");

  const handleInput = (e) => {
    e.preventDefault();
    onSubmit(username);
  };

  const handleChange = (e) => setUsername(e.target.value);

  const theme = React.useContext(ThemeContext);

  return (
    <form className="column player" onSubmit={handleInput}>
      <label className="player__label" htmlFor="username">
        {label}
      </label>
      <div className="row player__input">
        <input
          type="text"
          id="username"
          className={`input input--${theme}`}
          placeholder="Github's username"
          autoComplete="on"
          value={username}
          onChange={handleChange}
        />
        <button
          className={`btn btn--${theme}`}
          type="submit"
          disabled={!username}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};

function PlayerPreview({ username, onReset, label }) {
  const theme = React.useContext(ThemeContext);

  return (
    <div className="column player">
      <h3 className="player__label">{label}</h3>
      <div className={`row bg-${theme}`}>
        <div className="player__info">
          <img
            src={`https://github.com/${username}.png?size=200`}
            alt={`Avatar for ${username}`}
            className="avatar--small"
          />
          <a href={`https://github.com/${username}`} className="link">
            {username}
          </a>
        </div>
        <button className="btn--clear flex-center" onClick={onReset}>
          <FaTimesCircle color="rgb(194, 57, 42)" size={26} />
        </button>
      </div>
    </div>
  );
}
PlayerPreview.propTypes = {
  username: PropTypes.string.isRequired,
  onReset: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
