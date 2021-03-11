import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
  FlatList,
} from "react-native";
import { Camera } from "../../components";
import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Item = ({ url }) => {
  return (
    <View style={styles.imgContainer}>
      <Image source={{ uri: url }} style={styles.img} />
    </View>
  );
};
export default class Example extends Component {
  constructor() {
    super();
    this.state = {
      showCamera: false,
      photos: [],
    };
  }

  // function which will switch to camera mode
  handelPickAvatar = async () => {
    this.setState({
      showCamera: true,
    });
  };

  // it will get image uri from camera component
  getResponse = async (photo) => {
    let { photos } = this.state;
    photos.push({
      url: photo,
    });
    try {
      const jsonValue = JSON.stringify(photos);
      this.setState({
        showCamera: false,
        photos,
      });
      await AsyncStorage.setItem("photos", jsonValue);
    } catch (e) {}
  };

  backAction = () => {
    this.setState({
      showCamera: false,
    });
  };
  async componentDidMount() {
    try {
      const { photos } = this.state;
      const jsonValue = await AsyncStorage.getItem("photos");
      const allPhotos = JSON.parse(jsonValue);
      this.setState({
        photos: allPhotos,
      });
    } catch (e) {}
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  render() {
    const { photos } = this.state;
    const renderItem = ({ item }) => <Item url={item.url} />;

    return (
      <SafeAreaView style={styles.safeView}>
        {this.state.showCamera ? (
          <Camera
            path={this.props.navigation}
            sendResponse={this.getResponse}
          />
        ) : (
          <View style={{ flex: 1 }}>
            {photos && photos ? (
              <FlatList
                data={photos}
                renderItem={renderItem}
                keyExtractor={(item) => item.url}
              />
            ) : null}
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={this.handelPickAvatar}
                activeOpacity={0.5}
              >
                <FontAwesome name="camera" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeView: {
    flex: 1,
    paddingTop: 24,
  },
  container: {
    backgroundColor: "white",
    paddingVertical: 10,
  },
  bodyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  footer: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "red",
    width: 70,
    height: 70,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    color: "white",
    fontSize: 22,
  },
});
