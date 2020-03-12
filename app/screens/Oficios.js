import React, { Component, useEffect, useState } from "react";

import { View, Text, Image, StyleSheet, Flatlist } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import Carpetas from "../components/Carpetas/Carpetas";
import Header from "../components/Carpetas/Header";
import Moment from "moment";

export default function Oficios() {
  const [docs, setDocs] = useState([]);
  const [actualizar, setActualizar] = useState([]);
  useEffect(() => {
    fetch(
      "http://10.0.0.17/ApiMisOficios/api/Documentos/Buscar?offset=0&limit=50&idcarpeta=A65465FD-6A5A-49B3-95DD-3FC5BB3A71F5",
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
    return <Text>{Moment(dt).format("d MMM")}</Text>; //basically you can do all sorts of the formatting and others
  };
  const renderHeader = () =>{
    <Header/>
  }
  return (
    <ScrollView>
      {docs.map((u, i) => {
        return (
          <Card 
          key={i}
          >
            {/*Padre del componente */}
            <View style={{ flexDirection: "column" }}>
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
                <Text>{u.FechaEnvio}</Text>
                <Text> </Text>
                <Text> {dateFormater(u.FechaEnvio)}</Text>
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
      <View>
        <BottomSheet 
        snapPoints={[300, 200, 0]} 

        renderHeader={renderHeader()}
        />
      </View>
    </ScrollView>
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
