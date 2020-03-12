import React, { useEffect, useState } from "react";

import { View, Text, StyleSheet } from "react-native";
import { Card, Icon } from "react-native-elements";
import Moment from "moment";

export default function OficiosCardView() {
  const [docs, setDocs] = useState([]);
  const [actualizar, setActualizar] = useState([]);
  const [loading, setloading] = useState("");

  useEffect(() => {
    fetch(
      "http://10.0.0.17/ApiMisOficios/api/Documentos/Buscar?offset=0&limit=5&idcarpeta=88C8C04F-29B7-487D-B9E4-62D0E9433FD4",
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        setDocs(responseJson["Documentos"]);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  const dateFormater = dt => {
    Moment.locale("en");
    return <Text>{Moment(dt).format("d/MM/YYYY  HH:mm")}</Text>; //basically you can do all sorts of the formatting and others
  };
  return (
    <View>
      {docs.map((u, i) => {
        return (
          <Card key={i}>
            {/*Padre del componente */}
            <View
              accessibilityRole='button'
              onPress={console.log("Silenced")
              }
              style={{ flexDirection: "column" }}
            >
              {/*Elementos header */}
              <View style={styles.iconsinicio}>
                {u.Importancia < 3 ? (
                  <Icon
                    name={"alert-circle-outline"}
                    type="material-community"
                    color={u.Importancia === 2 ? "cyan" : "grey"}
                    reverseColor="black"
                  />
                ) : (
                  <Icon
                    name={"alert-outline"}
                    type="material-community"
                    color="red"
                    reverseColor="black"
                  />
                )}
                <Text> </Text>
                <Text>{u.Codigo}</Text>
                <Text> </Text>

                <Text> {dateFormater(u.FechaCreacion)}</Text>
                <Text> </Text>
                <View style={styles.iconsfin}>
                  {u.TieneArchivosAdjuntos && (
                    <Icon
                      name="attach-file"
                      type="material"
                      color="black"
                      reverseColor="black"
                    />
                  )}

                  <Icon
                    name="arrow-down-bold-box-outline"
                    type="material-community"
                    color="black"
                    reverseColor="black"
                  />
                  <Icon
                    name="eye-check"
                    type="material-community"
                    color="black"
                    reverseColor="black"
                  />
                </View>
              </View>
              <View>
                <Text style={styles.asunto}>{u.Asunto}</Text>
              </View>
              <View style={styles.footerCard}>
                <Icon
                  name="send"
                  type="material-community"
                  color="black"
                  reverseColor="black"
                />
                <Text> </Text>
                <Text style={styles.destinatarios}> {u.Destinatarios} </Text>
              </View>
            </View>
          </Card>
        );
      })}
    </View>
    /* <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
      <Text>Elevation 0</Text>
    </CardView>*/
  );
}
const styles = StyleSheet.create({
  iconsinicio: {
    flexDirection: "row",
    flex: 1,
    top: -4
  },
  iconsfin: {
    flexDirection: "row",
    flex: 1,
    top: 0,
    justifyContent: "flex-end"
  },
  footerCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start"
  },
  pantalla: {
    backgroundColor: "#000000"
  },
  asunto: {
    fontSize: 16
  },
  destinatarios: {
    fontSize: 10,
    top: 5
  }
});
