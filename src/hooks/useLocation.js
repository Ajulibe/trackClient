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

  useEffect(() => {
    if (shouldTrack) {
      startWatching();
    } else {
      subscriber.remove();
      setSubscriber(null);
    }
  }, [shouldTrack]);

  //it is convention to return an array of variables
  //that will be used by other files while creating a reuseable hook
  //err is used by the trackCreateScreen.
  return [err];
};
