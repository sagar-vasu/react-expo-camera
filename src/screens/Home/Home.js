// import React from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   StatusBar,
//   TextInput,
//   SafeAreaView,
//   ScrollView,
// } from "react-native";
// import { Input, CustomButton, Camera } from "../../components";
// import { FontAwesome } from "@expo/vector-icons";

// const renderContent = () => (
//   <View
//     style={{
//       backgroundColor: "white",
//       padding: 16,
//       height: 450,
//     }}
//   >
//     <Text>Swipe down to close</Text>
//   </View>
// );

// class HomeScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       sheetRef: null,
//       photos: [],
//     };
//   }

// // function which will switch to camera mode
// handelPickAvatar = async () => {
//   this.setState({
//     showCamera: true,
//   });
// };

// // it will get image uri from camera component
// getResponse = (photo) => {
//   let { photos } = this.state;
//   photos.push({
//     url: photo,
//   });

//   this.setState({
//     showCamera: false,
//     photos,
//   });
// };

//   render() {
//     let { photos } = this.state;
//     return (
//       <SafeAreaView style={styles.safeView}>
//         {this.state.showCamera ? (
//           <Camera
//             path={this.props.navigation}
//             sendResponse={this.getResponse}
//           />
//         ) : (
//           <View style={{ flex: 1 }}>
//             <ScrollView showsVerticalScrollIndicator={false}>
//               {photos &&
//                 photos.map((val, i) => {
//                   return (
//                     <View style={styles.imgContainer}>
//                       <Image source={{ uri: val.url }} style={styles.img} />
//                     </View>
//                   );
//                 })}
//             </ScrollView>

//             <View style={styles.container}>
//               <TouchableOpacity
//                 onPress={this.handelPickAvatar}
//                 activeOpacity={0.5}
//               >
//                 <FontAwesome name="camera" style={styles.icon} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </SafeAreaView>
//     );
//   }
// }

// const styles = StyleSheet.create({
// safeView: {
//   flex: 1,
//   paddingTop: 24,
// },
//   container: {
//     position: "absolute",
//     bottom: 120,
//     right: 30,
//   },
//   icon: {
//     color: "black",
//     fontSize: 40,
//   },

// imgContainer: {
//   marginVertical: 10,
//   marginHorizontal: 10,
// },
// img: {
//   width: "100%",
//   height: 300,
//   resizeMode: "stretch",
// },
// });
// export default HomeScreen;

import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  BackHandler,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { Camera, Input, CustomButton } from "../../components";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default class Example extends Component {
  constructor() {
    super();
    this.state = {
      showCamera: false,
      photos: [],
    };
  }

  pickImage = async () => {
    let { photos } = this.state;
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    this.RBSheet.close();
    photos.push({
      url: result.uri,
    });
    this.props.navigation.navigate("Details", {
      photos: this.state.photos,
    });
  };

  // function which will switch to camera mode
  handelPickAvatar = async () => {
    this.setState({
      showCamera: true,
    });
  };

  // it will get image uri from camera component
  getResponse = (photo) => {
    let { photos } = this.state;
    photos.push({
      url: photo,
    });
    this.setState({
      showCamera: false,
      photos,
    });
    this.props.navigation.navigate("Details", {
      photos: this.state.photos,
    });
  };

  backAction = () => {
    this.setState({
      showCamera: false,
    });
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.backAction);
  }

  componentWillUnmount() {
    // BackHandler.removeEventListener("hardwareBackPress", console.log("none"));
  }
  render() {
    return (
      <SafeAreaView style={styles.safeView}>
        {this.state.showCamera ? (
          <Camera
            path={this.props.navigation}
            sendResponse={this.getResponse}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Button
              title="OPEN BOTTOM SHEET"
              onPress={() => this.RBSheet.open()}
            />
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
