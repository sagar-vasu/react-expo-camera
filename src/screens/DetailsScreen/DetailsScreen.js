import React, { Component } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";

export default function DetailsScreen({ route, navigation }) {
  const { photos } = route.params;
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {photos &&
          photos.map((val, i) => {
            return (
              <View style={styles.imgContainer}>
                <Image source={{ uri: val.url }} style={styles.img} />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imgContainer: {
    marginVertical: 10,
    marginHorizontal: 10,
  },
  img: {
    width: "100%",
    height: 300,
    resizeMode: "stretch",
  },
});
