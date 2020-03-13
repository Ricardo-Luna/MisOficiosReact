import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { ListItem } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
export default function Carpetas() {
  const [carpetas, setCarpetas] = useState([]);
  useEffect(() => {
    fetch(
      "http://10.0.0.17/ApiMisOficios/api/Carpetas/Usuario/b3be6e2f-7e79-474c-9985-fab45ed8956a",
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        setCarpetas(responseJson);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  return (
    <ScrollView>
      {carpetas.map((u, i) => {
        return <ListItem key={i} title={u.Nombre} />;
      })}
    </ScrollView>
  );
}
