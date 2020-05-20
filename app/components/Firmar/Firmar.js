import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Switch, View, Text, AsyncStorage } from "react-native";
import { Input, Button, Image, Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import axios from "react-native-axios";
import Toast from "react-native-easy-toast";

export default function firmar(props) {
  const [error, setError] = useState(null);
  const [pw, setPw] = useState("123");
  const [user, setUser] = useState("ricardo.luna");
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setRenderComponent } = props;
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
      <Text style={styles.txt}>Introducir credenciales para firmar</Text>
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
      <View style={styles.container}>
        <View style={styles.button}>
          <Button
            icon={
              <Icon
                name="check"
                type="material-community"
                size={15}
                color="white"
              />
            }
            title=" Firmar"
          />
        </View>
        <View style={styles.button}>
          <Button
            icon={
              <Icon
                name="close-circle"
                type="material-community"
                size={15}
                color="white"
              />
            }
            title=" Cancelar"
            //  containerStyle={styles.button}
            buttonStyle={styles.btn}
            loading={isLoading}
            onPress={() => {
              setRenderComponent(false);
            }}
          />
        </View>
      </View>
    </View>
  );

  const checkCredentials = async(user, pw) => {
     var us = await AsyncStorage.getItem("@nickname");
     var ps = await AsyncStorage.getItem("@pw");
    

  };

}



const styles = StyleSheet.create({
  modal: { backgroundColor: "#fff" },
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
  view: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  input: {
    marginTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0)",
    // color:"white"
  },
  container: {
    marginTop: 20,
    width: "100%",
    flexDirection: "row",
  },

  button: {
    width: "30%",
    paddingLeft: 5,
    paddingTop: 10,
  },
  switch: {
    alignSelf: "center",
  },
  btn: {
    backgroundColor: "#404040",
    paddingLeft: 5,
  },
});
