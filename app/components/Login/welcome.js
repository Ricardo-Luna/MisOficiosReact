import React from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import { Image } from "react-native-elements";
const screenHeight = Math.round(Dimensions.get("window").height);

export default function welcome() {
  state = {
    ready: false,
    slideUpValue: new Animated.Value(0),
  };
  let { slideUpValue } = state;
  _start = () => {
    return Animated.parallel([
      Animated.timing(state.slideUpValue, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <View style={styles.splash}>
      { // <Image
        //  source={require("../../../assets/img_letra_g.png")}
        //  style={styles.backgroundImage}
        //  resizeMode="cover"
        ///>}
      }
        <Animated.View
          style={{
            top:screenHeight/4.5,
            transform: [
              {
                translateY: slideUpValue.interpolate({
                  inputRange: [0, 8],
                  outputRange: [0, -screenHeight],
                }),
              },
              {
                scaleX: slideUpValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, screenHeight/1000],
                }),
              },
              {
                scaleY: slideUpValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, screenHeight/1000],
                }),
              },
            ],
          }}
        >
          <Image
            source={require("../../../assets/icono.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          <Text style={styles.text}>Mis Oficios</Text>
        </Animated.View>
        <Animated.View
          style={{
            bottom:-(screenHeight/5),
            transform: [
              {
                translateY: slideUpValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, (screenHeight/9)*(screenHeight/900)],
                }),
              },
              {
                scaleX: slideUpValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1,screenHeight/1000],
                }),
              },
              {
                scaleY: slideUpValue.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1,screenHeight/1000],
                }),
              },
            ],
          }}
        >
          <Image
            source={require("../../../assets/escudo.png")}
            style={styles.escudo}
            resizeMode="center"
            resizeMethod="resize"
          />
        </Animated.View>
    </View>
  );
}
const styles = StyleSheet.create({
  splash: {
    marginTop: 0,
    alignContent: "center",
    flexDirection: "column",
  },
  backgroundImage: {
    height: 400,
    width: "100%",
    marginVertical: -50,
  },
  logo: {
    width: "100%",
    height: 120,
    marginLeft: 50,
    marginHorizontal: 10,
  },
  text: {
    fontFamily: "sans-serif-light",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,

    color: "#404040",
  },
  textScreen: {
    alignContent: "center",
    marginVertical: -30,
  },
  escudo: {
    bottom: 10,
    width: "100%",
    height: "80%",
    
  },

});
