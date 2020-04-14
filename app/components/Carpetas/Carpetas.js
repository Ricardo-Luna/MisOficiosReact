import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "react-native-router-flux";

export default function Carpetas(props) {
  //console.log(props);

  const [carpetas, setCarpetas] = useState([]);
  const { setCarpetaID, IdUsuario } = props;
  useEffect(() => {
    fetch(`http://10.0.0.17/ApiMisOficios/api/Carpetas/Usuario/${IdUsuario}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //console.log(props);

        setCarpetas(responseJson);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <ScrollView>
      
 
      {carpetas ? (
        carpetas.map((u, i) => {
          return (
            <ListItem
              key={i}
              title={u.Nombre}
              onPress={() => {
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
