import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import { ListItem ,VirtualizedList} from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";

export default function Carpetas(props) {
  //console.log(props);
  const {
    setCarpetaID,
    idActual,
    IdUsuario,
    carpetasCompleta,
    setCarpetaCompleta,
    carpetasInicial,
    loading,
    refRBSheet,
  } = props;
  console.log("Carpetas");

  const [carpetas, setCarpetas] = useState(carpetasInicial);
  //console.log(props);
  //console.log(carpetasInicial);

  // useEffect(() => {
  //   setCarpetas(carpetasInicial);
  //
  // }, []);

  useEffect(() => {
    fetch(`http://10.0.0.17/ApiMisOficios/api/Carpetas/Usuario/${IdUsuario}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setCarpetas(responseJson);
        //setCarpetaCompleta(responseJson);
        console.log(carpetas);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [refRBSheet]);
  //console.log(props);

  var sub = "";
  return (
    <ScrollView>
      {
        console.log(carpetas)}
      
      {carpetas ? (
        carpetas.map((u, i) => {
          sub = "";
          if (idActual === u.IdCarpeta) {
            // sub =  u.CantidadDocumentos +" "+" ⌵ " + "Carpeta actual";
            sub = " ⌵ " + "Carpeta actual";
          }
          if (u.Enviados) {
            sub = sub + " ◉ " + "Carpeta de enviados";
          }
          if (u.Recibidos) {
            sub = sub + " ◉ " + "Carpeta de recibidos";
          }
          if (u.Borradores) {
            sub = sub + " ◉ " + "Carpeta de borradores";
          }

          return (

            <ListItem
            key={i}
            title={`${u.Nombre}  (${u.CantidadDocumentos})`}
            subtitle={sub}
            linearGradientProps={
              idActual === u.IdCarpeta
                ? {
                    colors: ["#9ac3e3", "#9ac3e3"],
                    start: { x: 1, y: 0 },
                    end: { x: 0.2, y: 0 },
                  }
                : {
                    colors: ["#ffffff", "#ffffff"],
                    start: { x: 1, y: 0 },
                    end: { x: 0.2, y: 0 },
                  }
            }
            onPress={
              idActual === u.IdCarpeta
                ? () => {
                    console.log("Eso es carcel no no no");
                  }
                : () => {
                    refRBSheet.current.close();
                    loading(true);
                    setCarpetaID(u.IdCarpeta);
                    Actions.refresh({ title: u.Nombre });
                  }
            }
          />
          );


        })
      ) : (
          <Text> No hay carpetas para cargar </Text>
        )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#e5e5e5"
  },
  headerText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
    fontWeight: "bold"
  },
  GridViewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    //marginTop:30,
    margin: 5,
    backgroundColor: '#7B1FA2'
  },
  GridViewTextLayout: {
    fontSize: 20,
    fontWeight: 'bold',
    justifyContent: 'center',
    color: '#fff',
    padding: 10,
  }
});