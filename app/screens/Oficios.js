import React, { Component, useEffect, useState } from "react";

import { View, Text, Image, StyleSheet, Flatlist } from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

export default function Oficios() {
  const [docs, setDocs] = useState([]);
  const [actualizar, setActualizar] = useState([]);
  useEffect(() => {
    fetch(
      "http://10.0.0.17/ApiMisOficios/api/Documentos/Buscar?offset=0&limit=10&idcarpeta=d582fcc8-7b9e-4e3f-9980-cf77299cb0bc",
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

  return (
    <ScrollView
    >
      {docs.map((u, i) => {
        return (
          <Card key={i}>
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
                <Text>{new Date(u.FechaCreacion).format}</Text>
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

                  <Text> </Text>
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
    
    fontSize:16
  },
  destinatarios:{
    fontSize:10,
    top:5
  }
});
