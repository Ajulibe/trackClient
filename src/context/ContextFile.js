import { AsyncStorage } from "react-native";
import React, { useReducer } from "react";
import trackerApi from "../api/tracker";
import { navigate } from "../navigationRef";

// //CREATE CONTEXT
const authContext = React.createContext();

//REDUCER
const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return { errorMessage: "", token: action.payload };
    case "signin":
      return { errorMessage: "", token: action.payload };
    default:
      return state;
  }
};

///CREATE PROVIDER
export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    token: null,
    errorMessage: "",
  });

  //ACTIONS

  //SIGNUP
  const signup = async (email, password) => {
    try {
      const response = await trackerApi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signup", payload: "response.data.token" });

      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };

  //SIGNIN
  const signin = async (email, password) => {
    try {
      const response = await trackerApi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      dispatch({ type: "signin", payload: "response.data.token" });

      navigate("TrackList");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sign up",
      });
    }
  };

  //SIGNOUT
  const signout = (dispatch) => {
    return ({ email, password }) => {};
  };

  const boundActions = { signup, signin, signout };

  return (
    <authContext.Provider value={{ state, ...boundActions }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
