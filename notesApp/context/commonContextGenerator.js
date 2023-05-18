import React, { createContext, useReducer } from "react";

const commonContextGenerator = (initialState, reducer, actions) => {
  const AppContext = createContext(); // first create context

  //////////// then create the provider ////////////
  const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const dispatch_actions = {};
    for (let key in actions) {
      dispatch_actions[key] = actions[key](dispatch);
    }
    return (
      <AppContext.Provider value={{ state, ...dispatch_actions }}>
        {children}
      </AppContext.Provider>
    );
  };
  ///////////////////////////////////

  return { AppContext, AppProvider };
};
export default commonContextGenerator;
