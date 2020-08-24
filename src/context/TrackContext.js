import React, { useReducer } from "react";
import trackerApi from "../api/tracker";

// //CREATE CONTEXT
const trackContext = React.createContext();

//location reducer
const trackReducer = (state, action) => {};

///CREATE PROVIDER
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(trackReducer, []);

  //ACTIONS
  const fetchTracks = () => {};
  const createTrack = async (name, locations) => {
    await trackerApi.post("/tracks", { name, locations });
  };

  const boundActions = {
    fetchTracks,
    createTrack,
  };

  return (
    <trackContext.Provider value={{ state, ...boundActions }}>
      {children}
    </trackContext.Provider>
  );
};

export default trackContext;
