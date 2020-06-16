import React, { Component, useEffect, useState, useRef } from "react";

import { Icon, Divider, Input, ListItem } from "react-native-elements";
import {
  View,
  StyleSheet,
  Alert,
  Dimensions,
  AsyncStorage,
} from "react-native";
import Toast from "react-native-easy-toast";

import { Actions } from "react-native-router-flux";
import RBSheet from "react-native-raw-bottom-sheet";
import OficiosCardView from "../components/Oficios/OficioCardView";
import Carpetas from "../components/Carpetas/Carpetas";
import Loading from "../components/Loading";
const screenHeight = Math.round(Dimensions.get("window").height) / 10;

export default function Oficios(props) {
  const {
    inicio,
    id,
    carpetaCompleta,
    setCarpetaCompleta,
    username,
    carpetasInicial,
  } = props;
  console.log("Oficios");
  
  const [carpetas, setCarpetas] = useState(inicio);
  const [busqueda, setBusqueda] = useState("");
  const [updateList, setUpdateList] = useState(0);
  const toastRef = useRef();
  const [loading, setLoading] = useState(true);
  const refRBSheet = useRef();
  const refRBSheetOp = useRef();
  const [inputShow, setInputShow] = useState(false);
  const [renderComponent, setRenderComponent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);


  useEffect(() => {
    setRenderComponent(false);
    setIsVisibleModal(false);
  }, []);

  //useEffect(() => {
  //
  //    const backHandler = BackHandler.addEventListener(
  //      "hardwareBackPress",
  //      backAction
  //    );
  //    return () => backHandler.remove();
  //
  //
  //}, []);

  return (
    <View style={styles.buttonsheet}>
      <Toast ref={toastRef} position="center" opacity={0.7} />
      <View style={styles.cardview}>
        <OficiosCardView
          busqueda={busqueda}
          idUs={id}
          carpeta={carpetas}
          // carpetasInicial={carpetasInicial}
          setLoading={setLoading}
          updateList={updateList}
          toastRef={toastRef}
          setUpdateList={setUpdateList}
        />
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
            carpetasInicial={carpetasInicial}
            refRBSheet={refRBSheet}
            IdUsuario={id}
            loading={setLoading}
            idActual={carpetas}
            carpetasCompleta={carpetaCompleta}
            setCarpetaCompleta={setCarpetaCompleta}
          />
        </RBSheet>
        <RBSheet
          style={styles.buttonsheetOpciones}
          ref={refRBSheetOp}
          height={150}
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
          <View>
            <ListItem title={"Ayuda"} onPress={() => {}} />
            <ListItem
              title={`Cerrar sesión (${username})`}
              onPress={() => {
                refRBSheetOp.current.close();
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
                        var flag = "false";
                        AsyncStorage.setItem("@isSet", flag);
                        Actions.splash();
                      },
                    },
                  ]
                );
              }}
            />
          </View>
        </RBSheet>
        <Loading text="Cargando" isVisible={loading} />

        {
          /////////////////////////////
        }
        <View style={styles.navBar}>
          <Divider style={styles.div} height={3} />
          <View style={styles.inView}>
            {inputShow ? (
              <Input
                onChange={(e) => setBusqueda(e.nativeEvent.text)}
                leftIcon={{
                  type: "material-community",
                  name: "close-circle",
                  color: "gray",
                  onPress: () => {
                    setInputShow(!inputShow);
                    setBusqueda("");
                  },
                }}
              />
            ) : (
              <View style={styles.innerView}>
                <Icon
                  name={"magnify"}
                  type="material-community"
                  style={styles.iconSearch}
                  color="gray"
                  onPress={() => {
                    setInputShow(!inputShow);
                  }}
                  size={screenHeight / 2.5}
                />
              </View>
            )}
            <View style={styles.innerView}>
              <Icon
                name={"folder-multiple"}
                type="material-community"
                style={styles.iconDots}
                onPress={() => {
                  refRBSheet.current.open();
                }}
                color="gray"
                size={screenHeight / 2.5}
              />
            </View>
            <View style={styles.iconDots}>
              <Icon
                name={"dots-horizontal"}
                type="material-community"
                style={styles.iconDots}
                color="gray"
                onPress={() => {
                  refRBSheetOp.current.open();
                }}
                size={screenHeight / 2.5}
              />
            </View>
          </View>
        </View>

        {
          //////////////////////////////
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsheet: {
    flex: 2,
    flexDirection: "row",
    //backgroundColor: "transparent"
  },
  buttonsheetOpciones: {
    flex: 1,
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
  navBar: {
    height: screenHeight / 1.5,
    flexDirection: "column",
  },

  inView: {
    //position: "absolute",
    alignItems: "center",
    flexDirection: "row",

    //marginHorizontal: 80,
  },
  innerView: {
    // marginLeft: screenwidth / 1.3,
    flex: 1,
  },
  texto: {
    alignSelf: "center",
    marginBottom: 15,
    flex: 2,
  },
  icons: {
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  iconSearch: {
    flex: 1,
  },
  iconDots: {
    flex: 1,
  },
  div: {
    backgroundColor: "gray",
    alignContent: "flex-start",
  },
});

{
  /*
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
                    var flag = "false";
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
        </ActionButton> */
}
