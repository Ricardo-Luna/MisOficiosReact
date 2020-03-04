import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, ToastAndroid } from "react-native";
import { Image } from "react-native-elements";
import Modal from "../components/modal";
import Toast from "react-native-easy-toast";
import SesionForm from "../components/Login/sesionForm";

export default function Splash() {
  const [renderComponent, setRenderComponent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const toastRef = useRef();
  return (
    <View style={styles.splash}>
        {abirModal(toastRef,setRenderComponent, setIsVisibleModal)}
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
      <Text
        style={styles.text}
      >
        Mis Oficios
      </Text>
      <Image
        source={require("../../assets/escudo.png")}
        style={styles.escudo}
        resizeMode="contain"
        resizeMethod="auto"
      />

      {renderComponent && (
        <Modal isVisible={isVisibleModal} setIsVisible={setIsVisibleModal} hide={true}>
          {<SesionForm />}
        </Modal>
      )}
      <Toast ref={toastRef} position="bottom" opacity={1} />
    </View>
  );
}

const abirModal = (toastRef,setRenderComponent, setIsVisibleModal) => {
  setTimeout(() => {
    setRenderComponent(true);
    setIsVisibleModal(true);
    toastRef.current.show("Modal Abierto")
  }, 2000);
};

const styles = StyleSheet.create({
  splash: {
    marginTop: 0
  },
  backgroundImage: {
    height: 400,
    width: "100%",
    marginBottom: 20
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
