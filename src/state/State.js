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
          var combined = [...prevState.alerts, ...action.alerts];
          return {
            ...prevState,
            alerts: Array.from(new Set(combined.map(alert => alert["id"])))
              .map(id => combined.find(alert => alert["id"] === id))
          };
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
      alerts: [],
      location: null,
    },
  );
};
