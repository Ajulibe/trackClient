import { useContext } from "react";
import trackContext from "../context/TrackContext";
import locationContext from "../context/LocationContext";
import { navigate } from "../navigationRef";

export default () => {
  const { createTrack } = useContext(trackContext);
  const {
    state: { locations, name },
    reset,
  } = useContext(locationContext);
  //same thing as state.locations and state.name

  const saveTrack = async () => {
    await createTrack(name, locations);
    reset();
    navigate("TrackList");
  };
  return [saveTrack];
};
