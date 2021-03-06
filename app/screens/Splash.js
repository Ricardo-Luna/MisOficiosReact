import React, { useState, useRef, useEffect } from "react";
import { View, AsyncStorage, StyleSheet, Dimensions } from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Welcome from "../components/Login/welcome";
import Toast from "react-native-easy-toast";
import Modal from "../components/modal";
import SesionForm from "../components/Login/sesionForm";
import LoginAxios from "../components/Login/login";
import NetInfo from "@react-native-community/netinfo";
const screenHeight = Math.round(Dimensions.get("window").height);
export default function Splash() {
  const [renderComponent, setRenderComponent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [isConnected, setIsConnected] = useState(true);
  const [connectionType, setConnectionType] = useState("");
  const toastRef = useRef();
  const getData = async () => {
    try {
      console.log(isConnected);
      <Toast ref={toastRef} position="center" opacity={0.7} />;
      var us = await AsyncStorage.getItem("@nickname");
      var pw = await AsyncStorage.getItem("@pw");
      var st = await AsyncStorage.getItem("@isSet");
      if (st == "true") {
        toastRef.current.show("Sesión iniciada anteriormente", 2000);
        LoginAxios(us, pw);
      } else {
        setTimeout(() => {
          setRenderComponent(true);
          setIsVisibleModal(true);
          _start();
        }, 1800);
      }
    } catch (e) {
      setRenderComponent(true);
      setIsVisibleModal(true);
      _start();
    }
  };
  //-----------------------------------------
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      //console.log(state);
      setConnectionType(state.type);
      setIsConnected(state.isConnected);
      //console.log("Connection type", state.type);
      //console.log("Is connected?", state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  //useEffect(() => {
  //  toastRef.current.show(`Conexión en ${state.type}`)
  //}, [state.isConnected])

  useEffect(() => {
    if (isConnected ) {
      // if (connectionType === "wifi") {
      _start();
      getData();
      // }
    } else {
     // toastRef.current.show("No tiene conexión a internet", 2000);
    }
  }, [isConnected]);
  //-------------------------------------------------------
  return (
    <View>
      <Welcome  />
     
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
              toastRef={toastRef}
              setIsVisible={setIsVisibleModal}
              bckgrColor={"rgba(0, 0, 0, 0)"}
              isConnected={isConnected}
            />
          }
        </Modal>
      )}
      <Toast ref={toastRef} position="bottom" opacity={1} />


    </View>
  );
}

const styles = StyleSheet.create({
  advertencia: {
    color: "red",
    alignContent: "center",
    top: 50,
  },
  footer: {
    bottom: 0,
    //top: screenHeight - 20,

    position: "absolute",
    flexDirection: "row",

  },
  
});
//var carpetas;
//  const getCarpetas = async () => {
//    {
//      try {
//        await fetch(
//          `http://10.0.0.17/ApiMisOficios/api/Carpetas/Usuario/${idUs}`,
//          {
//            method: "GET",
//          },
//          { timeout: 3 }
//        )
//          .then((response) => response.json())
//          .then((responseJson) => {
//            carpetas = responseJson;
//            //  console.log(carpetas);
//            try {
//              carpetas.map((u) => {
//                if (u.Nombre === "Recibidos") {
//                  setCarpeta(u.IdCarpeta);
//                  AsyncStorage.setItem("@carpeta", u.IdCarpeta);
//                }
//              });
//            } catch (error) {
//              //console.log(error);
//            }
//          })
//          .then(() => {
//            Actions.oficios({
//              id: idUs,
//              inicio: carpeta,
//              carpeta: carpetas,
//            });
//            setRenderComponent();
//          })
//          .catch(function (error) {
//            if (error.response) {
//              console.log(error.response.data);
//              console.log(error.response.status);
//              console.log(error.response.headers);
//            }
//          });
//      } catch (error) {
//        console.log(error);
//      }
//    }
//  };

//console.log(us);
//console.log(pw);
//console.log(st);
//console.log(cp);
//console.log(id);
{
  /*<Text style={styles.text} resizeMode="top">
        {screenHeight} X {screenwidth}
  </Text>*/
}
//-------------------------------------------
//let { slideUpValue, fadeValue, SlideInLeft } = state;
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

//useEffect(() => {
//  console.log(isLogged);
//  {
//    isLogged === "false" && LoginAxios(user, pw);
//    //setRenderComponent(false);
//    //setIsVisibleModal(false);
//  }
//  // LoginAxios("ricardo.luna", "123");
//}, [isLogged]);

//console.log(st);
// setLoading(true);
//  Actions.oficios({
//    id: idUs,
//    inicio: carpeta,
//    carpeta: carpetas,
//  });
//const [loading, setLoading] = useState(true);
//const [user, setUser] = useState("");
//const [pw, setPw] = useState("");
//const [idUs, setIdUs] = useState("");
//const [carpeta, setCarpeta] = useState("");
//const [isLogged, setIsLogged] = useState(false);

//const NetInfo = require("react-native-netinfo");
//var NetworkInfo = require('react-native-network-info');
//useEffect(() => {
//  NetworkInfo.getIPV4Address().then(ipv4Address => {
//    console.log(ipv4Address);
//  });
//}, []);
//setUser(us);
//setPw(pw);
//setCarpeta(cp);
//setIsLogged(st);
//setIdUs(id);
//var cp = await AsyncStorage.getItem("@carpeta");
//var id = await AsyncStorage.getItem("@idUser");
