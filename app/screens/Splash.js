import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Image } from "react-native-elements";
import Modal from "../components/Modal";
import Toast from "react-native-easy-toast";
import SesionForm from "../components/Login/SesionForm";

export default function Splash() {
  const [renderComponent, setRenderComponent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const toastRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setIsVisibleModal(true);
      setRenderComponent(true);
    }, 2000);
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
      <Image
        source={require("../../assets/escudo.png")}
        style={styles.escudo}
        resizeMode="contain"
        resizeMethod="auto"
      />

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
    marginTop: 0
  },
  backgroundImage: {
    height: 400,
    width: "100%",
    marginBottom: -30
  },
  logo: {
    width: "100%",
    height: 150
  },
  text: {
    fontFamily: "sans-serif-light",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    marginBottom: 50,
    color: "#404040"
  },
  escudo: {
    marginTop: 50,
    marginBottom: 400,
    height: "30%",
    width: "100%"
  }
});
