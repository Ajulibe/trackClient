import React, { useEffect, useContext } from "react";
import authContext from "../context/ContextFile";

const ResolveAuthScreen = () => {
  const { tryLocalSignin } = useContext(authContext);

  useEffect(() => {
    tryLocalSignin();
  }, []);

  return null;
};

export default ResolveAuthScreen;
