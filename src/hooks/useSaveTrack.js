import { useContext } from "react";
import trackContext from "../context/TrackContext";
import locationContext from "../context/LocationContext";

export default () => {
  const { createTrack } = useContext(trackContext);
  const {
    state: { locations, name },
  } = useContext(locationContext);
  //same thing as state.locations and state.name

  const saveTrack = () => {
    createTrack(name, locations);
  };
  return [saveTrack];
};
