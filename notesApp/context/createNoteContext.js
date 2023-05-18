import React, { createContext, useContext, useState } from "react";
import commonContextGenerator from "./commonContextGenerator";
import jsonServer from "../src/api/jsonServer";

const reducer = (state, actions) => {
  switch (actions.type) {
    case "set": {
      return (state = actions.payload);
    }
    case "get": {
      return state;
    }
    default:
      return state;
  }
};

const setCreateNoteScreen = (dispatch) => {
  return (showCreateScreen) => {
    console.log("set");

    dispatch({ type: "set", payload: showCreateScreen });
  };
};

/////////// finally generate context for create a new note /////////////
export const { AppContext, AppProvider } = commonContextGenerator(
  false,
  reducer,
  {
    setCreateNoteScreen,
  }
);
