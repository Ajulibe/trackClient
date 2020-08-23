// import "../_mockLocation";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import Map from "./components/Map";
import locationContext from "../context/LocationContext";
import useLocation from "../hooks/useLocation";

const TrackCreateScreen = ({ isFocused }) => {
  const { addLocation } = useContext(locationContext);

  //this is the same syntax he used with the
  //createDataContext in the Blog Project
  //remember this is the callback that was initially commented
  //in the useLocation file
  //const [err] = useLocation((location) => addLocation(location));
  const [err] = useLocation(isFocused, addLocation);

  // console.log(isFocused);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create A Track</Text>
      <Map />

      {err ? <Text>Please enable location Services</Text> : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
