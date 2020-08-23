import { AsyncStorage } from "react-native";
import React, { useReducer } from "react";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

// //CREATE CONTEXT
const locationContext = React.createContext();

//location reducer
const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    default:
      return state;
  }
};

///CREATE PROVIDER
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, {
    recording: false,
    locations: [],
    currentLocation: null,
  });

  //ACTIONS
  //StartRecording
  const startRecording = () => {};

  //stopRecording
  const stopRecording = () => {};

  //addLocation
  const addLocation = (location) => {
    // console.log("HI THERE");
    dispatch({ type: "add_current_location", payload: location });
  };

  const boundActions = {
    startRecording,
    stopRecording,
    addLocation,
  };

  return (
    <locationContext.Provider value={{ state, ...boundActions }}>
      {children}
    </locationContext.Provider>
  );
};

export default locationContext;
