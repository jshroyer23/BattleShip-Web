import superagent from 'superagent';
const API_URL = process.env.REACT_APP_API_URL;
export const GAME_UPDATE = 'GAME_UPDATE';
// let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViYzc5MDdiYWM2MjZlZTRlNWU1NDdhZiIsImlhdCI6MTUzOTgwNTMwN30.js-1EujtFH6USWF0qQN4CeVY8wkubIllZsZRemSNwUk';


export const gameFetch = (gameId) =>
  (dispatch, getState) =>{
    if(!getState().auth){
      throw new Error('No Authenication Found.');
    }
    superagent.get(`${API_URL}/api/game/${gameId}`)
      .set('Authorization', `Bearer ${getState().auth}`)
      .then(res =>{
        dispatch(gameUpdate(res.body));
      });
  };

export const gameUpdate = (gameData) =>({
  type: GAME_UPDATE,
  payload: gameData,
});

export const gameCreate = (opponent) => (dispatch, getState) =>{
  if(!getState().auth){
    throw new Error('No authetication found.');
  }
  return superagent.post(`${API_URL}/api/games`)
    .set('Authorization', `Bearer ${getState().auth}`)
    .send({'opponent': opponent})
    .then(res =>{
      dispatch(gameUpdate(res.body));
    });
};



export const gameMove = (gameId, ...coords) =>
  (dispatch, getState) =>{
    if(!getState().auth){
      throw new Error('No authetication found.');
    }
    superagent.post(`${API_URL}/api/games/${gameId}/move`)
      .set('Authorization', getState().auth ? `Bearer ${getState().auth}` : null)
      .send({coors: coords})
      .then(()=>{
        dispatch(gameFetch(gameId));
      });
  };