import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

class CustomButton extends React.Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this.props.onPress}
        activeOpacity={0.8}
        style={[styles.button, { backgroundColor: this.props.color }]}
      >
        <Text style={styles.text}>{this.props.name}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 30,
    borderRadius: 6,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0,
    marginVertical: 6,
    paddingHorizontal: 30,
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
});
export default CustomButton;
