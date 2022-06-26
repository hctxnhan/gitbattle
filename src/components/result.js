import React from 'react';
import { battle } from '../utils/api';
import Card from './card';
import {
  FaCompass,
  FaUsers,
  FaUserFriends,
  FaBriefcase,
  FaUser,
} from 'react-icons/fa';
import Loading from './loading';
import Tooltip from './tooltip';
import { Link } from 'react-router-dom';
import ThemeContext from '../contexts/theme';

function ProfileList({ profile }) {
  return (
    <ul className='card-list'>
      <li>
        <FaUser color='rgb(239, 155, 155)' size={22} />
        {profile.name}
      </li>
      {profile.location && (
        <li>
          <Tooltip text="User's location">
            <FaCompass color='rgb(144, 155, 255)' size={22} />
            {profile.location}
          </Tooltip>
        </li>
      )}
      {profile.company && (
        <li>
          <Tooltip text="User's company">
            <FaBriefcase color='#795548' size={22} />
            {profile.company}
          </Tooltip>
        </li>
      )}
      <li>
        <FaUsers color='rgb(129, 195, 245)' size={22} />
        {profile.followers} followers
      </li>
      <li>
        <FaUserFriends color='rgb(64, 183, 95)' size={22} />
        {profile.following} following
      </li>
    </ul>
  );
}

function resultReducer(state, action) {
  switch (action.type) {
    case 'success':
      return {
        winner: action.winner,
        loser: action.loser,
        error: null,
        loading: false,
      };
    case 'error':
      return {
        ...state,
        error: action.errorMessage,
        loading: false,
      };
    default:
      throw new Error("That action type isn't supported");
  }
}

export default function Result() {
  const urlParams = new URLSearchParams(window.location.search);
  const playerOne = urlParams.get('playerOne');
  const playerTwo = urlParams.get('playerTwo');

  const theme = React.useContext(ThemeContext);

  const initialState = {
    winner: null,
    loser: null,
    error: null,
    loading: true,
  };

  const [state, dispatch] = React.useReducer(resultReducer, initialState);

  React.useEffect(() => {
    battle([playerOne, playerTwo])
      .then((result) =>
        dispatch({
          winner: result[0],
          loser: result[1],
          type: 'success',
        })
      )
      .catch(({ message }) =>
        dispatch({
          type: 'error',
          errorMessage: message,
        })
      );
  }, [playerOne, playerTwo]);

  if (state.loading) {
    return <Loading text='Battling' />;
  }

  if (state.error) {
    return <p className='center-text error'>{state.error}</p>;
  }

  return (
    <React.Fragment>
      <div className='grid space-around container-sm'>
        <Card
          header={state.winner.score === state.loser.score ? 'Tie' : 'Winner'}
          subheader={`Score: ${state.winner.score}`}
          avatar={state.winner.profile.avatar_url}
          href={state.winner.profile.html_url}
          name={state.winner.profile.login}
        >
          <ProfileList profile={state.winner.profile} />
        </Card>

        <Card
          header={state.winner.score === state.loser.score ? 'Tie' : 'Loser'}
          subheader={`Score: ${state.loser.score}`}
          avatar={state.loser.profile.avatar_url}
          href={state.loser.profile.html_url}
          name={state.loser.profile.login}
        >
          <ProfileList profile={state.loser.profile} />
        </Card>
      </div>
      <Link className={`btn btn--${theme} btn--space`} to='/battle'>
        Reset
      </Link>
    </React.Fragment>
  );
}
