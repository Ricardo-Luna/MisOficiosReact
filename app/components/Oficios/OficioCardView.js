import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text, StyleSheet } from "react-native";
import { Card, Icon } from "react-native-elements";

import Moment from "moment";

export default function OficiosCardView(props) {
  const [docs, setDocs] = useState([]);
  const [actualizar, setActualizar] = useState([])
  const { carpeta,setLoading } = props;
  
  useEffect(() => {
    fetch(
      `http://10.0.0.17/ApiMisOficios/api/Documentos/Buscar?offset=0&limit=10&idcarpeta=${carpeta}`,
      {
        method: "GET"
      }
    )
      .then(response => response.json())
      .then(responseJson => {
        setDocs(responseJson["Documentos"]);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [carpeta]);
  const dateFormater = dt => {
    Moment.locale("en");
    return <Text>{Moment(dt).format("d/MM/YYYY  HH:mm")}</Text>; //basically you can do all sorts of the formatting and others
  };
  return (
    <ScrollView>
      {docs.map((u, i) => {
        return (
          <Card key={i}>
            {/*Padre del componente */}
            <View
              accessibilityRole="button"
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
    </ScrollView>
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
