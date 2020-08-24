import React, { useContext, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Input, Button } from "react-native-elements";
import Spacer from "./Spacer";
import locationContext from "../../context/LocationContext";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(locationContext);

  console.log(locations.length);

  return (
    <>
      <Spacer>
        <Input placeholder="Enter name" onChangeText={changeName} />
      </Spacer>
      {recording ? (
        <Button title="Stop" onPress={stopRecording} />
      ) : (
        <Button title="Start Recording" onPress={startRecording} />
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default TrackForm;
