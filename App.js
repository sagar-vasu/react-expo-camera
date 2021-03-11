import React from "react";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import MainApp from "./src/config/Navigation/index";
import { WelcomeScreen } from "./src/screens";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs(true);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    setTimeout(() => {
      this.setState({ isReady: true });
    }, 1000);
  }

  render() {
    if (!this.state.isReady) {
      return <WelcomeScreen />;
    }

    return <MainApp />;
  }
}
