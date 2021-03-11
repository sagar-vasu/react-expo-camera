import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Welcome Screen",
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.introTitle}>Welcome To App</Text>
        <ActivityIndicator
          size={69}
          color="#440f7d"
          style={styles.activity}
        ></ActivityIndicator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  introTitle: {
    fontSize: 30,
    fontWeight: "bold",
  },
  activity: {
    marginVertical: 40,
  },
});
export default Welcome;
