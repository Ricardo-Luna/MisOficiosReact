import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Switch,
  View,
  Text,
  AsyncStorage,
  Keyboard,
} from "react-native";
import { Input, Button, Image } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import axios from "react-native-axios";
import LoginAxios from "../Login/login";
//import AsyncStorage from "@react-native-community/async-storage";

export default function Login(props) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [error, setError] = useState(null);
  const [pw, setPw] = useState("123");
  //const [carpetas, setCarpetas] = useState("");
  const [carpetaInicial, setCarpetaInicial] = useState("");
  const [user, setUser] = useState("cecilia.barajas");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [carpetaCompleta, setCarpetaCompleta] = useState([]);
  const { setRenderComponent, setIsVisible, toastRef, isConnected } = props;
  var t;
  const credenciales = {
    NickName: user,
    Password: pw,
    AccesoAplicacion: 1,
    DerechosRangoInicial: 1000,
    DerechosRangoFinal: 1012,
  };
  const storeData = async () => {
    try {
      var flag = isEnabled.toString();
      await AsyncStorage.setItem("@nickname", user);
      await AsyncStorage.setItem("@pw", pw);
      await AsyncStorage.setItem("@isSet", flag);
    } catch (e) {
      // console.log(e);
    }
  };
  //TODO
  var carpeta = "",
    id = "",
    carpetas = "";
  const getCarpetas = async (usuario, nombre) => {
    {
      await fetch(
        `http://10.0.0.17/ApiMisOficios/api/Carpetas/Usuario/${usuario}`,
        {
          method: "GET",
        }
      )
        .then((response) => response.json())
        .then((responseJson) => {
          setCarpetaCompleta(responseJson);
          carpetas = responseJson;
          responseJson.map((u, i) => {
            if (u.Nombre === "Recibidos") {
              setCarpetaInicial(u.IdCarpeta);
              carpeta = u.IdCarpeta;
              AsyncStorage.setItem("@carpeta", u.IdCarpeta);
            }
          });
        })
        .then(() => {
          setIsLoading(false);
          Actions.oficios({
            id: id,
            inicio: carpeta,
            carpetasInicial: carpetas,
            carpetaCompleta: carpetaCompleta,
            username: nombre,
            setCarpetaCompleta: setCarpetaCompleta,
          });
          setIsLoading(false);
          setRenderComponent();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const loginAxios = async () => {
    var p2 = new Promise((resolve, reject) => {
      t = setTimeout(() => {
        setIsLoading(false);
        //toastRef.current.show("Revisa tu conexión a red");
        resolve;
      }, 3000);
    });
    var p1 = new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: "http://10.0.0.17/ApiUsuarios/api/Usuarios/Login",
        data: credenciales,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          if (response.data.Permisos[0].NumeroPermiso === 1000) {
            clearTimeout(t);
            console.log("Inicio de sesión exitoso");
            {
              isEnabled && storeData();
            }
            getCarpetas(response.data.IdUsuario, response.data.NickName);
            id = response.data.IdUsuario;
            AsyncStorage.setItem("@idUser", id);
          } else {
            setIsLoading(false);
          }
        })
        .catch(function (error) {
          toastRef.current.show("Revisa tus credenciales");
          console.log("Fallo");
          setIsLoading(false);
          if (error.response) {
            toastRef.current.show("Revisa tus credenciales");
          }
        });
    });
    Promise.race([p1, p2])
      .then(() => {
        //setIsLoading(false);
      })
      .catch(() => {
        toastRef.current.show("Revisa tu conexión a red");
      });
  };

  return (
    <View style={styles.modal}>
      {/* <Image
        source={require("../../../assets/icono.png")}
        style={styles.logo}
        resizeMode="contain"
      /> 
      <Text style={styles.bienvenido}>Bienvenido a mi nuebo post</Text>
     />*/}
      <Input
        placeholder="Usuario"
        containerStyle={styles.input}
        defaultValue=""
        onChange={(e) => setUser(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2",
        }}
        errorMessage={error}
      />
      <Input
        placeholder="Contraseña"
        containerStyle={styles.input}
        password={true}
        defaultValue=""
        secureTextEntry={hidePassword}
        onChange={(e) => setPw(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHidePassword(!hidePassword),
        }}
        errorMessage={null}
      />
      <Text style={styles.switch}>Recordar sesión</Text>
      <Switch
        style={styles.switch}
        trackColor={{ false: "#767577", true: "#46babc" }}
        thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.container}
        buttonStyle={styles.btn}
        loading={isLoading}
        onPress={() => {
          Keyboard.dismiss();
          if (user === "" || pw === "") {
            toastRef.current.show("Campos vacíos");
          } else {
            123;
            setIsLoading(true);

            loginAxios();
          } //LoginAxios(user,pw);
        }}
      />
      {
      !isConnected && 
       <Text style={styles.advertencia}>No hay conexión a Internet</Text>
       }

    </View>
  );
}
const styles = StyleSheet.create({
  modal: {},
  logo: {
    width: "100%",
    height: 150,
  },
  bienvenido: {
    fontFamily: "sans-serif-light",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "#404040",
  },
  advertencia: {
    color: "red",
    alignSelf: "center",
    paddingTop: 10,
    //flex: 1,
    paddingBottom: 10,
  },
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, .4)",
  },
  container: {
    marginTop: 20,
    width: "100%",
  },
  container: {
    marginTop: 20,
    width: "100%",
  },
  switch: {
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#404040",
  },
});
