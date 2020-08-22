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
    case "clear_error_message":
      return { ...state, errorMessage: "" };
    case "signout":
      return { token: null, errorMessage: "" };
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
  const tryLocalSignin = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch({ type: "signin", payload: token });
      navigate("TrackList");
    } else {
      navigate("Signup");
    }
  };

  //clearError
  const clearErrorMessage = () => {
    dispatch({ type: "clear_error_message" });
  };

  //signup
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
        payload: "Something went wrong with sign in",
      });
    }
  };

  //SIGNOUT
  const signout = async () => {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("loginFlow");
  };

  const boundActions = {
    signup,
    signin,
    signout,
    clearErrorMessage,
    tryLocalSignin,
  };

  return (
    <authContext.Provider value={{ state, ...boundActions }}>
      {children}
    </authContext.Provider>
  );
};

export default authContext;
