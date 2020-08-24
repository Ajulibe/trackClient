import "../_mockLocation";
import React, { useContext, useCallback } from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import Map from "./components/Map";
import locationContext from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "./components/TrackForm";
import { FontAwesome } from "@expo/vector-icons";

const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(locationContext);

  //useCallback is used to prevent the function to be run everytime
  //this component re-renders as a result of any general state change
  //here the function is only ran when sate.recording changes.
  //it simply means call this function only if the state of recording has changed
  //we could have easily passed in state.recording in useLocation but whast the point?

  //The whole point of this is to get useEffect to run again when somthing changes
  //and this function action changes because the component has re-rendered so just use
  //this funtion. but React syays you cant use it directly. you have you use it in a
  //use callback hook and add only that particular variable that has changed in the
  //function in an array.
  const callback = useCallback(
    (location) => addLocation(location, state.recording),
    [state.recording]
  );

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
  const [err] = useLocation(isFocused || state.recording, callback);

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

TrackCreateScreen.navigationOptions = {
  title: "Add track",
  tabBarIcon: <FontAwesome name="plus" size={20} />,
};

const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
