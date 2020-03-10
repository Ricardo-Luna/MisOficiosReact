import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Input, Button, Image } from "react-native-elements";
import { Actions } from "react-native-router-flux";

export default function Login(props) {
  const [error, setError] = useState(null);
  const [pw, setPw] = useState("");
  const [user, setUser] = useState(null);
  const [hidePassword, setHidePassword] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { setRenderComponent,setIsLogged } = props;
  return (
    <View>
     {/* <Image
        source={require("../../../assets/icono.png")}
        style={styles.logo}
        resizeMode="contain"
      />
     <Text style={styles.bienvenido}>Bienvenido a Mis Oficios</Text>*/}
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
        placeholder="Contraseña"
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
          Actions.oficios();
          setRenderComponent();
          setIsLogged()
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
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
    marginTop: 10
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
