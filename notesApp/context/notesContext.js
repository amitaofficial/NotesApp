import React, { createContext, useContext, useState } from "react";
import commonContextGenerator from "./commonContextGenerator";
import jsonServer from "../src/api/jsonServer";

// first create the reducer for state = notesArray
const reducer = (state, actions) => {
  switch (actions.type) {
    case "getNotes": {
      return actions.payload;
    }
    case "addNote": {
      return [
        ...state,
        {
          id: Math.floor(Math.random() * 99999),
          title: actions.payload.title,
          content: actions.payload.content,
        },
      ];
    }
    default:
      return state;
  }
};

/////actions for the reducer/////////////

//////////// call apis to get notesArray //////////////
const getNotes = (dispatch) => {
  return async (callback) => {
    await jsonServer
      .get("/notes")
      .then((response) => {
        // console.log("getnotes response is :", response.data);
        dispatch({ type: "getNotes", payload: response.data });
      })
      .catch((error) => {
        console.log("error in getnotes:", error.message);
      });
    if (callback) {
      callback();
    }
  };
};
///////////// api call to add a note ///////////////////////
const addNote = (dispatch) => {
  return async (title, content, callback) => {
    const response = await jsonServer
      .post("/notes", { title, content })
      .then((response) => {})
      .catch((error) => {
        console.log("error in add note:", error.message);
      });
    if (callback) {
      callback();
    }
  };
};

/////////// finally generate context for notes array /////////////
export const { AppContext, AppProvider } = commonContextGenerator([], reducer, {
  getNotes,
  addNote,
});
