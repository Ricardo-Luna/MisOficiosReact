import React, { Component, useEffect, useState, useRef } from "react";
import { Icon } from "react-native-elements";
import {
  View,
  StyleSheet,
  Button,
  Alert,
  BackHandler,
  AsyncStorage,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ActionButton from "react-native-action-button";
import { Actions } from "react-native-router-flux";
import RBSheet from "react-native-raw-bottom-sheet";
import OficiosCardView from "../components/Oficios/OficioCardView";
import Carpetas from "../components/Carpetas/Carpetas";
import Loading from "../components/Loading";
//import Modal from "../components/Modal";
import SesionForm from "../components/Login/sesionForm";

export default function Oficios(props) {
  const [carpetas, setCarpetas] = useState(props.inicio);
  //const [carpetaInicial, setcarpetaInicial] = useState("");
  const [loading, setLoading] = useState(true);
  const refRBSheet = useRef();
  const [renderComponent, setRenderComponent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  useEffect(() => {
    setRenderComponent(false);
    setIsVisibleModal(false);
  }, []);


  useEffect(() => {
    const backAction = () => {
      Alert.alert("Salir", "¿Quieres salir de Mis Oficios?", [
        {
          text: "No",
          onPress: () => null,
          style: "cancel",
        },
        { text: "Sí", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.buttonsheet}>
      <View style={styles.cardview}>
        <OficiosCardView carpeta={carpetas} setLoading={setLoading} />
        <RBSheet
          style={styles.buttonsheet}
          ref={refRBSheet}
          height={300}
          duration={600}
          closeOnDragDown={true}
          closeOnPressMask={true}
          customStyles={{
            wrapper: {
              backgroundColor: "transparent",
            },
            draggableIcon: {
              backgroundColor: "grey",
            },
          }}
        >
          <Carpetas
            setCarpetaID={setCarpetas}
            IdUsuario={props.id}
            loading={setLoading}
            carpetasCompleta={props.carpeta}
          />
        </RBSheet>
        <Loading text="Cargando Archivos" isVisible={loading} />
      </View>
      <ActionButton
        buttonColor="#46babc"
        buttonText="☰"
        degrees={90}
        offsetY={10}
        offsetX={10}
        position={"right"}
      >
        <ActionButton.Item
          buttonColor="#00b0e1"
          title="Carpetas"
          onPress={() => {
            refRBSheet.current.open();
          }}
        >
          <Icon
            name={"folder"}
            backgroundColor="transparent"
            type="material-community"
            color="black"
          />
        </ActionButton.Item>
        <ActionButton.Item title="Ayuda" buttonColor="#6fb74d">
          <Icon
            name={"help"}
            backgroundColor="transparent"
            type="material-community"
            color="black"
          />
        </ActionButton.Item>
        <ActionButton.Item title="Buscar" buttonColor="#d52f89">
          <Icon
            name={"magnify"}
            backgroundColor="transparent"
            type="material-community"
            color="black"
          />
        </ActionButton.Item>
        <ActionButton.Item
          title="Cerrar sesión"
          buttonColor="#f08119"
          onPress={() => {
            Alert.alert(
              "Cerrar sesión",
              "Tendrás que ingresar tus credenciales de nuevo",
              [
                {
                  text: "Cancelar",
                  onPress: () => null,
                  style: "cancel",
                },
                {
                  text: "Salir",
                  onPress: () => {
                    var flag = "false"
                    AsyncStorage.setItem("@isSet", flag);
                    Actions.splash();
                  },
                },
              ]
            );
          }}
        >
          <Icon
            name={"account-arrow-left"}
            backgroundColor="transparent"
            type="material-community"
            color="black"
          />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsheet: {
    flex: 2,
    flexDirection: "row",
    //backgroundColor: "transparent"
  },
  cardview: {
    flex: 1,
  },
  viewScreen: {
    flex: 1,
    flexDirection: "column",
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white",
  },
});
