import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";

export default function Carpetas(props) {
  //console.log(props);

  const { setCarpetaID, IdUsuario, carpetasCompleta, loading } = props;

  return (
    <ScrollView>
      {carpetasCompleta ? (
        carpetasCompleta.map((u, i) => {
          return (
            <ListItem
              key={i}
              title={u.Nombre}
              onPress={() => {
                loading(true);
                setCarpetaID(u.IdCarpeta);
                Actions.refresh({ title: u.Nombre });
              }}
            />
          );
        })
      ) : (
        <Text> Lista vacía </Text>
      )}
    </ScrollView>
  );
}
