import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import axios from "react-native-axios";
import Toast from "react-native-easy-toast";

export default function Login(props) {
  const [error, setError] = useState(null);
  const [pw, setPw] = useState("");
  const [user, setUser] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [permiso, setPermiso] = useState(false);
  const { setRenderComponent, setIsLogged } = props;
  const toastRef = useRef();
  const credenciales = {
    NickName: user,
    Password: pw,
    AccesoAplicacion: 1,
    DerechosRangoInicial: 1000,
    DerechosRangoFinal: 1012
  };

  const loginAxios = () => {
    axios({
      method: "post",
      url: "http://10.0.0.17/ApiUsuarios/api/Usuarios/Login",
      data: credenciales,
      headers: { "Content-Type": "application/json" }
    })
      .then(function(response) {
        //handle success

        if (response.data.Permisos[0].NumeroPermiso === 1000) {
          Actions.oficios({id: response.data.IdUsuario});
          setRenderComponent();
          setIsLoading(false);
        } else {
          setIsLoading(false);
          console.log("Not equal");
        }
      })
      .catch(function(response) {
        //handle error
        setIsLoading(false);
        console.log(response);
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
        defaultValue="ricardo.lun"
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
        defaultValue="12"
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
          setIsLoading(true);
          loginAxios();
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
