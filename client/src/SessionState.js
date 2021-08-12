import React, { createContext, useContext, useReducer } from 'react'
export let SessionContext= createContext();

export let SessionState= ({ reducer, initialState, children }) => (
    < SessionContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </SessionContext.Provider>
  );
  
  export const useStateValue = () => useContext(SessionContext);

  // save all the session state so can be grabbed later 




