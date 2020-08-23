import * as Location from "expo-location";

const tenMetersWithDegress = 0.0001;

const getLocation = (increment) => {
  return {
    timestamp: 10000000,
    coords: {
      speed: 0,
      heading: 0,
      accuracy: 5,
      altitudeAccuracy: 5,
      altitude: 4,
      longitude: 3.347739475513837 + increment * tenMetersWithDegress,
      latitude: 6.617130969735326 + increment * tenMetersWithDegress,
    },
  };
};

let counter = 0;
setInterval(() => {
  Location.EventEmitter.emit("Expo.locationChanged", {
    watchId: Location._getCurrentWatchId(),
    location: getLocation(counter),
  });
  counter++;
}, 1000);
