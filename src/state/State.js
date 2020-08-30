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
    },
  );
};
