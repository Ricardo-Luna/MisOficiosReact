import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import axios from "react-native-axios";

export default function Login(props) {
  const [error, setError] = useState(null);
  const [pw, setPw] = useState("");
  const [user, setUser] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setRenderComponent, setIsLogged } = props;
  const credenciales = {
    NickName: "ricardo.luna",
    Password: "123",
    AccesoAplicacion: 1,
    DerechosRangoInicial: 1000,
    DerechosRangoFinal: 1012
  };
  const headers = {
    "Content-Type": "application/json"
  };
  const loginAxios = () => {
    axios
      .post(`10.0.0.17/ApiUsuarios/api/Usuarios/Login`, credenciales, headers)
      .then(response => {
        console.log(response.IdUsuario);
      });
  };

  let data = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8"
    },
    body: JSON.stringify({
      NickName: "ricardo.luna",
      password: "123",
      AccesoAplicacion: 1,
      DerechosRangoInicial: 1000,
      DerechosRangoFinal: 1012
    })
  };
  const login = () => {
    fetch(
      `10.0.0.17/ApiUsuarios/api/Usuarios/Login`,
      { method: "POST" },
      {
        body: JSON.stringify({
          NickName: "ricardo.luna",
          password: "123",
          AccesoAplicacion: 1,
          DerechosRangoInicial: 1000,
          DerechosRangoFinal: 1012
        })
      }
    )
      .then(response => response.json()) //Promesa
      .then(responsejson => console.log(responsejson))
      .catch(error => {
        console.log(error);
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
        defaultValue="ricardo.luna"
        onChange={e => setUser(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: "account-circle-outline",
          color: "#c2c2c2"
        }}
        errorMessage={error}
      />
      <Input
        placeholdear="Contraseña"
        containerStyle={styles.input}
        password={true}
        defaultValue="123"
        secureTextEntry={hidePassword}
        onChange={e => setPw(e.nativeEvent.text)}
        rightIcon={{
          type: "material-community",
          name: hidePassword ? "eye-outline" : "eye-off-outline",
          color: "#c2c2c2",
          onPress: () => setHidePassword(!hidePassword)
        }}
        errorMessage={null}
      />
      <Button
        title="Iniciar sesión"
        containerStyle={styles.container}
        buttonStyle={styles.btn}
        loading={isLoading}
        onPress={() => {
          loginAxios();
          //Actions.oficios();
          //setRenderComponent();
          //setIsLogged();
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  modal: {},
  logo: {
    width: "100%",
    height: 150
  },
  bienvenido: {
    fontFamily: "sans-serif-light",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,

    color: "#404040"
  },
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10
  },
  input: {
    marginTop: 10,
    backgroundColor: "rgba(255, 255, 255, .4)"
  },
  container: {
    marginTop: 20,
    width: "100%"
  },
  container: {
    marginTop: 20,
    width: "100%"
  },
  btn: {
    backgroundColor: "#404040"
  }
});
