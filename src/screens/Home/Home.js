import React, { Component } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  Text,
} from "react-native";
import { Camera, CustomButton } from "../../components";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import RBSheet from "react-native-raw-bottom-sheet";

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
      allPhotos: [],
    };
  }

  // function which will switch to camera mode
  handelPickAvatar = async () => {
    this.setState({
      showCamera: true,
    });
  };

  // it will get image uri from camera component
  getResponse = async (uri) => {
    let photo = {
      uri,
    };
    const savephots = this.state.allPhotos;
    savephots.push(photo);
    this.setState({
      showCamera: false,
      allPhotos: savephots,
    });
    this.RBSheet.close();

    try {
      const jsonValue = JSON.stringify(savephots);
      await AsyncStorage.setItem("images", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    let photo = {
      uri: result.uri,
    };
    const savephots = this.state.allPhotos;
    savephots.push(photo);
    this.setState({
      showCamera: false,
      allPhotos: savephots,
    });
    this.RBSheet.close();
    try {
      const jsonValue = JSON.stringify(savephots);
      await AsyncStorage.setItem("images", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  async componentDidMount() {
    try {
      const jsonValue = await AsyncStorage.getItem("images");
      const check = jsonValue != null ? JSON.parse(jsonValue) : null;
      this.setState({
        allPhotos: check,
      });
    } catch (e) {
      // error reading value
    }
  }

  render() {
    const { allPhotos, showCamera } = this.state;
    const renderItem = ({ item }) => <Item url={item.uri} />;

    return (
      <SafeAreaView style={styles.safeView}>
        {this.state.showCamera ? (
          <Modal
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
              this.RBSheet.close();
              this.setState({
                showCamera: !showCamera,
              });
            }}
            visible={showCamera}
          >
            <View style={{ flex: 1 }}>
              <Camera
                path={this.props.navigation}
                sendResponse={this.getResponse}
              />
            </View>
          </Modal>
        ) : (
          <View style={{ flex: 1 }}>
            {allPhotos && allPhotos ? (
              <FlatList
                data={allPhotos}
                renderItem={renderItem}
                keyExtractor={(item) => item.url}
              />
            ) : null}
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={() => this.RBSheet.open()}
                activeOpacity={0.5}
              >
                <FontAwesome name="plus" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          height={350}
          openDuration={250}
          customStyles={{
            container: {
              alignItems: "center",
            },
          }}
        >
          <View style={styles.container}>
            <Text style={styles.title}>Upload Photo</Text>
            <Text style={styles.value}>Choose Your Profile Picture</Text>
            <CustomButton
              name="Take Photo"
              onPress={() => this.handelPickAvatar()}
              color="red"
            />
            <CustomButton
              onPress={() => this.pickImage()}
              name="Choose From Library"
              color="red"
            />
            <CustomButton
              onPress={() => this.RBSheet.close()}
              name="Cancel"
              color="red"
            />
          </View>
        </RBSheet>
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
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
    marginVertical: 5,
  },
  value: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "center",
    marginVertical: 5,
    color: "grey",
  },
});
