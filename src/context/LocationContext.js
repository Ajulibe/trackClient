import React, { useReducer } from "react";

// //CREATE CONTEXT
const locationContext = React.createContext();

//location reducer
const locationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    case "start_recording":
      return { ...state, recording: true };
    case "stop_recording":
      return { ...state, recording: false };
    case "add_location":
      return { ...state, locations: [...state.locations, action.payload] };
    case "change_name":
      return { ...state, name: action.payload };
    case "reset":
      return { ...state, name: "", locations: [] };
    default:
      return state;
  }
};

///CREATE PROVIDER
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(locationReducer, {
    name: "",
    recording: false,
    locations: [],
    currentLocation: null,
  });

  //ACTIONS
  //change name
  const changeName = (name) => {
    dispatch({ type: "change_name", payload: name });
  };

  //StartRecording
  const startRecording = () => {
    dispatch({ type: "start_recording" });
  };

  //stopRecording
  const stopRecording = () => {
    dispatch({ type: "stop_recording" });
  };

  //addLocation
  const addLocation = (location, recording) => {
    // console.log("HI THERE");
    dispatch({ type: "add_current_location", payload: location });
    if (recording) {
      dispatch({ type: "add_location", payload: location });
    }
  };

  const reset = () => {
    dispatch({ type: "reset" });
  };

  const boundActions = {
    startRecording,
    stopRecording,
    addLocation,
    changeName,
    reset,
  };

  return (
    <locationContext.Provider value={{ state, ...boundActions }}>
      {children}
    </locationContext.Provider>
  );
};

export default locationContext;
