import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";

export default function Carpetas(props) {
  //console.log(props);
  const {
    setCarpetaID,
    idActual,
    IdUsuario,
    carpetasCompleta,
    loading,
    refRBSheet,
  } = props;

  //console.log(props);
  var sub = "";
  return (
    <ScrollView>
      { console.log(idActual)}
      {
       carpetasCompleta ? (
        carpetasCompleta.map((u, i) => {    
          sub = " ";
          if (idActual === u.IdCarpeta) {
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
              title={u.Nombre}
              subtitle={sub}
              linearGradientProps={
                idActual === u.IdCarpeta &&
                {
                colors: ['#99EDC3', '#99EDC3'],
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
