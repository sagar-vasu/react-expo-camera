import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class Inputs extends Component {

  render() {
    return (
      <TextInput style={styles.input}
        underlineColorAndroid="transparent"
        placeholder={this.props.placeholder}
        placeholderTextColor="black"
        autoCapitalize="none"
        onChangeText={this.props.onChangeText}
      />


    )
  }
}
export default Inputs

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
    height: 45,
    borderWidth: 1,
    paddingLeft: 7,
    borderRadius: 6,
    borderColor: '#440f7d'
  }
})