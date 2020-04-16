import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Switch, View, Text } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import axios from "react-native-axios";
import Toast from "react-native-easy-toast";

export default function firmar(props) {
  const [error, setError] = useState(null);
  const [pw, setPw] = useState("123");
  const [user, setUser] = useState("ricardo.luna");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const toastRef = useRef();

  return (
    <View style={styles.modal}>
      {/* <Image
        source={require("../../../assets/icono.png")}
        style={styles.logo}
        resizeMode="contain"
      /> 
      <Text style={styles.bienvenido}>Bienvenido a mi nuebo post</Text>
     />*/}
    <Text >Introducir credenciales</Text>
      <Input
        placeholder="Usuario"
        containerStyle={styles.input}
        defaultValue="ricardo.luna"
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
        defaultValue="123"
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
      <Button
        title="Firmar"
        containerStyle={styles.container}
        buttonStyle={styles.btn}
        loading={isLoading}
        onPress={() => {
          console.log("Firmando");
          
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  modal: {backgroundColor:"#fff"},
  logo: {
    width: "100%",
    height: 150,
  },
  txt:{
   // color="#404040"
  },
  bienvenido: {
    fontFamily: "sans-serif-light",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 24,
    color: "#404040",
  },
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
    color:"white"
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
