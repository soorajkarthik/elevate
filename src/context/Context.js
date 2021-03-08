import React from 'react';
import * as Auth from '../requests/AuthRequests';

export const AppContext = React.createContext();

// App context methods
export const useAppContext = (state, dispatch) =>
  React.useMemo(
    () => ({
      signIn: (data) => Auth.signIn(data, dispatch),
      signOut: () => Auth.signOut(dispatch),
      signUp: (data) => Auth.signUp(data, dispatch),
      passwordReset: (email) => Auth.passwordReset(email, dispatch),
      getState: () => state,
      dispatch: (action) => dispatch(action)
    }),
    [state],
  );
