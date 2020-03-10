import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Image } from "react-native-elements";
import Modal from "../components/Modal";
import Toast from "react-native-easy-toast";
import SesionForm from "../components/Login/SesionForm";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenwidth = Math.round(Dimensions.get("window").width);
export default function Splash() {
  const [renderComponent, setRenderComponent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleModal(true);
      setRenderComponent(true);
    }, 0);
  }, []);

  return (
    <View style={styles.splash}>
      <Image
        source={require("../../assets/img_letra_g.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Image
        source={require("../../assets/icono.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.text}>Mis Oficios</Text>
      {/*<Text style={styles.text} resizeMode="top">
        {screenHeight} X {screenwidth}
  </Text>*/}
      <Image
        source={require("../../assets/escudo.png")}
        style={styles.escudo}
        resizeMode="contain"
        resizeMethod="auto"
      />
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

      {/*renderComponent && (
        <Modal
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          hide={true}
        >
          {
            <SesionForm
              setRenderComponent={setRenderComponent}
              setIsLogged={setIsLogged}
            />
          }
        </Modal>
        )*/}
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
    marginVertical:-50
  },
  logo: {
    width: "100%",
    height: 120,
    marginLeft:50,
    marginHorizontal:10
  },
  text: {
    fontFamily: "sans-serif-light",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,

    color: "#404040"
  },
  textScreen: {
    alignContent: "center"
  },
  escudo: {
    bottom: 100,
    height: "60%",
    marginVertical:-50
  },
  footer: {
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    alignContent: "flex-end"
  },
  elementsContainer: {
    flex: 1
  }
});
