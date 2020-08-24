import { useState, useEffect } from "react";
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from "expo-location";

//this file is creating a reuseable hook that is
//related to watching a users location
export default (shouldTrack, callback) => {
  //the isFocused taken from withNavigationFocus from
  // react-navigation is renamed to shouldTrack
  //remember, it returns a boolean(True or False)
  //if we ever want use effectuse an updated state value, then
  //the value has to be included in the array to show it has changed
  //this will tell useEffect to run again with the updated value.
  //Clean up functions only run the next time that use effect hook is called
  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    } else {
      subscriber.remove();
      setSubscriber(null);
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  const [err, setErr] = useState(null);
  const [subscriber, setSubscriber] = useState(null);

  const startWatching = async () => {
    try {
      await requestPermissionsAsync();
      //the below function comes back with a lot of properties and we
      //then assign those properties to the sub state in Context
      //also we can stop this watching process by calling remove()
      const sub = await watchPositionAsync(
        {
          accuracy: Accuracy.BestForNavigation,
          timeInterval: 1000,
          distanceInterval: 10,
        },
        //(location) => {
        // addLocation(location);
        callback
        //}
      );
      setSubscriber(sub);
    } catch (e) {
      setErr(e);
    }
  };

  //it is convention to return an array of variables
  //that will be used by other files while creating a reuseable hook
  //err is used by the trackCreateScreen.
  return [err];
};
