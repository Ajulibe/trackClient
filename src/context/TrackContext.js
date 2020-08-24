import React, { useReducer } from "react";
import trackerApi from "../api/tracker";

// //CREATE CONTEXT
const trackContext = React.createContext();

//location reducer
const trackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    default:
      return state;
  }
};

///CREATE PROVIDER
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(trackReducer, []);

  //ACTIONS
  const fetchTracks = async () => {
    const response = await trackerApi.get("/tracks");
    dispatch({ type: "fetch_tracks", payload: response.data });
  };

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
