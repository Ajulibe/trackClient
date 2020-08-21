import React, { useState, useContext } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "./components/Spacer";
import authContext from "../context/ContextFile";

const SignupScreen = ({ navigation }) => {
  const { state, signup } = useContext(authContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(state);

  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign Up For Tracker</Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Spacer />
      <Input
        secureTextEntry
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {state.errorMessage ? (
        <Text style={styles.errorMessage}>{state.errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button title="Sign Up" onPress={() => signup(email, password)} />
      </Spacer>
      <TouchableOpacity onPress={() => navigation.navigate("Signin")}>
        <Spacer>
          <Text style={styles.link}>
            Already have an account? Sign in Instead
          </Text>
        </Spacer>
      </TouchableOpacity>
    </View>
  );
};

//NAVIGATION OPTIONS
SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};
//you can also write it as an object.
//The above method is used to pass a prop to the object

// SignupScreen.navigationOptions = {
//         header: null
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 200,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    marginLeft: 15,
    marginTop: 15,
  },
  link: {
    color: "blue",
  },
});

export default SignupScreen;
