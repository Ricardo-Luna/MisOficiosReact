import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Animated } from "react-native";
import { Image } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Modal from "../components/Modal";
import SesionForm from "../components/Login/sesionForm";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenwidth = Math.round(Dimensions.get("window").width);

export default function Splash() {
  const [renderComponent, setRenderComponent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const toastRef = useRef();
  var md5 = require('md5')
  state = {
    ready: false,
    slideUpValue: new Animated.Value(0)
  };

  _start = () => {
    return Animated.parallel([
      Animated.timing(state.slideUpValue, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true
      })
    ]).start();
  };

  useEffect(() => {
    console.log(`logged: ${isLogged}`);
    
    setRenderComponent(false);    
    setIsVisibleModal(false);
    setTimeout(() => {
      setRenderComponent(true);
      setIsVisibleModal(true);
      _start();
    }, 2000);
  }, [Splash]);
  //useEffect(() => {
  //  setTimeout(() => {
  //    setIsVisibleModal(false)
  //    setRenderComponent(false);
  //  }, 1500);
  //}, [Animated.parallel])

  let { slideUpValue, fadeValue, SlideInLeft } = state;
  return (
    <View style={styles.splash}>
      <Image
        source={require("../../assets/img_letra_g.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Animated.View
        style={{
          transform: [
            {
              translateY: slideUpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -200]
              })
            },
            {
              scaleX: slideUpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7]
              })
            },
            {
              scaleY: slideUpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7]
              })
            }
          ]
        }}
      >
        <Image
          source={require("../../assets/icono.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.text}>Mis Oficios</Text>
      </Animated.View>

      {/*<Text style={styles.text} resizeMode="top">
        {screenHeight} X {screenwidth}
  </Text>*/}
      <Animated.View
        style={{
          transform: [
            {
              translateY: slideUpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [0, screenwidth-350]
              })
            },
           // {
           //   scaleX: slideUpValue.interpolate({
           //     inputRange: [0, 1],
           //     outputRange: [1, 1.4]
           //   })
           // },
           // {
           //   scaleY: slideUpValue.interpolate({
           //     inputRange: [0, 1],
           //     outputRange: [1, 1.4]
           //   })
           // }
          ]
        }}
      >
        <Image
          source={require("../../assets/escudo.png")}
          style={styles.escudo}
          resizeMode="center"
          resizeMethod="resize"
        />
      </Animated.View>

      <View style={styles.footer}>
        <View
          style={{ width: 50, height: 50, backgroundColor: "#00b0e1", flex: 1 }}
        />
        <View
          style={{ width: 50, height: 50, backgroundColor: "#6fb74d", flex: 1 }}
        />
        <View
          style={{ width: 50, height: 50, backgroundColor: "#d52f89", flex: 1 }}
        />
        <View
          style={{ width: 50, height: 50, backgroundColor: "#f08119", flex: 1 }}
        />
        <View
          style={{ width: 50, height: 50, backgroundColor: "#46babc", flex: 1 }}
        />
      </View>

      {renderComponent && (
        <Modal
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          hide={false}
        >
          {
            <SesionForm
              setRenderComponent={setRenderComponent}
              setIsLogged={setIsLogged}
            />
          }
        </Modal>
      )}
      <Toast ref={toastRef} position="bottom" opacity={1} />
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    marginTop: 0,
    alignContent: "center",
    flexDirection: "column"
  },
  backgroundImage: {
    height: 400,
    width: "100%",
    marginVertical: -50
  },
  logo: {
    width: "100%",
    height: 120,
    marginLeft: 50,
    marginHorizontal: 10
  },
  text: {
    fontFamily: "sans-serif-light",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 30,

    color: "#404040"
  },
  textScreen: {
    alignContent: "center",
    marginVertical: -30
  },
  escudo: {
    //bottom: 0,
    width: "100%",
    height: "80%",
    marginVertical: -80
  },
  footer: {
    alignItems: "center",
    position: "absolute",
    bottom: 110,
    flexDirection: "row",
    alignContent: "flex-end"
  },
  elementsContainer: {
    flex: 1
  }
});
