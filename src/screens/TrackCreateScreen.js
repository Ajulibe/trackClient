import "../_mockLocation";
import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import Map from "./components/Map";
import locationContext from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "./components/TrackForm";

const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(locationContext);

  //this is the same syntax he used with the
  //createDataContext in the Blog Project
  //remember this is the callback that was initially commented
  //in the useLocation file
  //once we start recording this function is called as a callback
  //and our present location is passed to the function whixh is dispatched
  //and updates our global state in our reducer.
  //remeber that this err is gotten from the running of this function.
  //this is where the fuction is actually called
  //it is the same thing as below.
  //run the function and send the result to err.
  // const x = aka(4);
  const [err] = useLocation(isFocused, (location) =>
    addLocation(location, state.recording)
  );

  // console.log(isFocused);
  return (
    <SafeAreaView forceInset={{ top: "always" }}>
      <Text h2>Create A Track</Text>
      <Map />

      {err ? <Text>Please enable location Services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
