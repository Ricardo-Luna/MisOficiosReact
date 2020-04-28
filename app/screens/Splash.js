import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  AsyncStorage,
} from "react-native";
import { Image } from "react-native-elements";
import Toast from "react-native-easy-toast";
import Modal from "../components/modal";
import SesionForm from "../components/Login/sesionForm";
import { Actions } from "react-native-router-flux";
import Loading from "../components/Loading";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenwidth = Math.round(Dimensions.get("window").width);
//import AsyncStorage from "@react-native-community/async-storage";

export default function Splash() {
  const [renderComponent, setRenderComponent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [idUs, setIdUs] = useState("");
  const [carpeta, setCarpeta] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const toastRef = useRef();

  state = {
    ready: false,
    slideUpValue: new Animated.Value(0),
  };

  const getData = async (callback) => {
    try {
      var us = await AsyncStorage.getItem("@nickname");
      var pw = await AsyncStorage.getItem("@pw");
      var st = await AsyncStorage.getItem("@isSet");
      var cp = await AsyncStorage.getItem("@carpeta");
      var id = await AsyncStorage.getItem("@idUser");
      setUser(us);
      setPw(pw);
      setCarpeta(cp);
      setIsLogged(st);
      setIdUs(id);
      if (pw === "true") {
    //    callback();
        setLoading(st);
      }
    } catch (e) {
      console.log(e);
    }
  };
  var carpetas;
  const getCarpetas = async () => {
    {
      try {
        await fetch(
          `http://10.0.0.17/ApiMisOficios/api/Carpetas/Usuario/${idUs}`,
          {
            method: "GET",
          }
        )
          .then((response) => response.json())
          .then((responseJson) => {
            carpetas = responseJson;
            console.log(carpetas);
            try {
              carpetas.map((u) => {
                if (u.Nombre === "Recibidos") {
                  setCarpeta(u.IdCarpeta);
                  AsyncStorage.setItem("@carpeta", u.IdCarpeta);
                }
              });
            } catch (error) {
              console.log(error);
            }
          })
          .then(() => {
            // setIsLoading(false);
            Actions.oficios({
              id: idUs,
              inicio: carpeta,
              carpeta: carpetas,
            });
            setRenderComponent();
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  };
  _start = () => {
    return Animated.parallel([
      Animated.timing(state.slideUpValue, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    setTimeout(
      () => {
        if (isLogged == "true" || null) {
          // getCarpetas(idUs);
          // Actions.oficios({
          //   id: idUs,
          //   inicio: carpeta,
             //   carpeta: carpetas,
          // });
          setRenderComponent(false);
          setIsVisibleModal(false);
          setLoading(false);
        } else {
          setRenderComponent(true);
          setIsVisibleModal(true);
          _start();
        }
      },
      // Actions.oficios()
      2000
    );
  }, [isLogged]);

  useEffect(() => {
    getData(getCarpetas());
  }, []);

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
                outputRange: [0, -200],
              }),
            },
            {
              scaleX: slideUpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7],
              }),
            },
            {
              scaleY: slideUpValue.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7],
              }),
            },
          ],
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
                outputRange: [0, screenwidth - 350],
              }),
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
          ],
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
              bckgrColor={"rgba(0, 0, 0, 0)"}
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
    //bottom: 0,
    width: "100%",
    height: "80%",
    marginVertical: -80,
  },
  footer: {
    alignItems: "center",
    position: "absolute",
    bottom: 110,
    flexDirection: "row",
    alignContent: "flex-end",
  },
  elementsContainer: {
    flex: 1,
  },
});
