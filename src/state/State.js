import React from 'react';
export const useStateManager = () => {
  return React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            userToken: null,
          };
        case 'FETCHED_ALERTS':
          return action.alerts.length > 0
            ? { ...prevState, alerts: action.alerts.concat(prevState.alerts) }
            : prevState;

        case 'LOCATION_UPDATE':
          return {
            ...prevState,
            location: action.location,
          };
        case 'START_LOADING':
          return {
            ...prevState,
            isLoading: true,
          };
        case 'FINISH_LOADING':
          return {
            ...prevState,
            isLoading: false,
          };
      }
    },
    {
      isLoading: true,
      userToken: null,
      alerts: null,
      location: null,
    },
  );
};
