import React, { useEffect, useState } from "react";
//import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  Alert,
  RefreshControl,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  BackHandler,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import axios from "react-native-axios";
import Moment from "moment";
import { NetworkInfo } from "react-native-network-info";
const screenHeight = Math.round(Dimensions.get("window").height);

export default function OficiosCardView(props) {
  const { busqueda, updateList, setUpdateList } = props;
  const [docs, setDocs] = useState([]);
  // const [actualizar, setActualizar] = useState([])
  const [loadMore, setLoadMore] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [nextPage, setNextPage] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const { carpeta, setLoading, idUs } = props;
  const cadenaConexion = "http://10.0.0.17/ApiMisOficios";
  const cardsPerScreen = (screenHeight / 130 - 1).toFixed(0);
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = 20;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  const backAction = () => {
    // Alert.alert("Salir", "¿Quieres salir de Mis Oficios?", [
    //   {
    //     text: "No",
    //     onPress: () => null,
    //     style: "cancel",
    //   },
    //   { text: "Sí", onPress: () => BackHandler.exitApp() },
    // ]);
    return true;
  };
  //console.log(props);
  function wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, []);

  const handleMore = async () => {
    //if(hasMore){}
    setLoadMore(true);
    let httpReq = cadenaConexion + nextPage;
    // console.log(httpReq);
    await axios
      .get(httpReq)
      .then((response) => {
        try {
          setNextPage(response.data.Siguiente);
          //console.log(nextPage);
        } catch (error) {
          console.log(error);
        }

        setLoadMore(false);
        const resultDocuments = [...docs, ...response.data.Documentos];
        setDocs(resultDocuments);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        setLoadMore(false);
      });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchDocs();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  const fetchDocs = async () => {
    //console.log(`${screenHeight}, cards per screen ${cardsPerScreen}`);

    axios
      .get(
        `http://10.0.0.17/ApiMisOficios/api/Documentos/Buscar?offset=0&limit=8&texto=${props.busqueda}&idcarpeta=${carpeta}`
      )
      .then((response) => {
        //console.log(`response.data`);
        {
          response.data.Siguiente === "" ? setHasMore(false) : setHasMore(true);
        }
        //console.log(hasMore);

        setNextPage(response.data.Siguiente);
        setLoading(false);
        setLoadMore(false);
        setDocs(response.data.Documentos);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const fetchDoc = async (id, tipo, status) => {
    fetch(`http://10.0.0.17/ApiMisOficios/api/Documentos/{${id}}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        {
          response.documentoHTML
            ? Actions.documento({
                docString: response.documentoHTML,
                tipo: tipo,
                updateList: updateList,
                setUpdateList: setUpdateList,
                id: idUs,
                IdDoc: id,
                status: status,
                setLoading: setLoading,
              })
            : console.log("Documento para borrador");
          setLoading(false);
        }
      })
      .then();
  };

  useEffect(() => {
    fetchDocs();
  }, [carpeta, busqueda, updateList]);
  const dateFormater = (dt) => {
    var esLocale = require("moment/locale/es");
    Moment.updateLocale("es", esLocale);
    return <Text>{Moment(dt).format("D/MM/YYYY | HH:mm")}</Text>; //basically you can do all sorts of the formatting and others
  };
  var checked = "";
  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        {
          nextPage && setLoadMore(true);
        }
        if (isCloseToBottom(nativeEvent)) {
          if (nextPage != "") {
            setLoadMore(false);
            handleMore();
          }
        }
      }}
      scrollEventThrottle={400}
      persistentScrollbar={true}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {docs.map((u, i) => {
        if (u.Leido === 2 && u.Tipo >= 2) {
          checked = "eye-check";
        } else {
          checked = "eye-off";
        }
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              setLoading(true);
              BackHandler.removeEventListener("hardwareBackPress", backAction);
              fetchDoc(u.IdDocumento, u.Tipo, u.Estatus);
            }}
          >
            <Card
              key={i}
              title={u.Estatus === 3 ? `● ${u.Asunto}` : `${u.Asunto}`}
              titleStyle={u.Estatus === 3 ? styles.noLeido : styles.leido}
            >
              {/*Padre del componente */}
              <View style={styles.card}>
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
                  <Text> | </Text>

                  <Text>
                    {" "}
                    {u.Tipo === 1
                      ? dateFormater(u.FechaCreacion)
                      : dateFormater(u.FechaEnvio)}{" "}
                    |
                  </Text>
                  <Text> </Text>
                  <View style={styles.iconsfin}>
                   
                   
                      <Icon
                        name="attach-file"
                        type="material"
                        color={u.TieneArchivosAdjuntos ? "black" : "white" }
                        reverseColor="black"
                      />
                   

                    
                      <Icon
                        name={"eraser"}
                        type="material-community"
                        color={u.Tipo === 1 ? "black" : "white" }
                      />
                    

                    <Icon
                      name={
                        u.Estatus === 2
                          ? "arrow-right-bold-box-outline"
                          : "arrow-down-bold-box-outline"
                      }
                      type="material-community"
                      color={u.Estatus === 2 ? "#03c04a" : "#20B2AA"}
                      reverseColor="black"
                    />

                    {
                      //  console.log(u.IdDocumento)
                    }
                    {u.Tipo > 1 ? (
                      <Icon
                        name={u.Leido === 2 && u.Tipo >= 2 ? "eye" : "eye-off"}
                        type="material-community"
                        color={u.Leido === 2 ? "orange" : "black"}
                        reverseColor="black"
                      />):
                      <Icon
                        name={ "eye" }
                        type="material-community"
                        color={u.Leido === 2 ? "white" : "white"}
                        reverseColor="black"
                      />
                    }
                  </View>
                </View>
                <View>
                  {
                    // <Text style={styles.asunto}>{u.Asunto}</Text>
                  }
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
          </TouchableOpacity>
        );
      })}
      <FooterList loadMore={loadMore} />
    </ScrollView>

    /* <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
      <Text>Elevation 0</Text>
    </CardView>*/
  );
  function FooterList(props) {
    const { loadMore } = props;

    if (loadMore) {
      return (
        <View style={styles.loadingRestaurants}>
          <ActivityIndicator size="large" />
        </View>
      );
    } else {
      return (
        <View style={styles.notFoundDocuments}>
          <Text>◉</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  leido: {
    flexDirection: "column",
    //  fontWeight: "bold",
    fontSize: 15,
    //backgroundColor: "cyan",
  },
  noLeido: {
    flexDirection: "column",
    color: "#1f93db",
  },
  card: {
    height: 55,
  },
  iconsinicio: {
    flexDirection: "row",
    flex: 1,
    top: -4,
  },
  iconsfin: {
    flexDirection: "row",
    flex: 1,
    top: 0,
    justifyContent: "flex-end",
  },
  footerCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "flex-start",
  },
  pantalla: {
    backgroundColor: "#000000",
  },
  asunto: {
    fontSize: 16,
  },
  destinatarios: {
    fontSize: 10,
    top: 5,
  },
  notFoundDocuments: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  loadingRestaurants: {
    marginTop: 20,
    alignItems: "center",
  },
});

// const fetchHttpDocs = async () => {
//   fetch(
//     `http://10.0.0.17/ApiMisOficios/api/Documentos/Buscar?offset=0&limit=10&idcarpeta=${carpeta}`,
//     {
//       method: "GET",
//     }
//   )
//     .then((response) => response.json())
//     .then((responseJson) => {
//       setDocs(responseJson["Documentos"]);
//       setLoading(false);
//     })
//     .catch((error) => {
//       console.error(error);
//       setLoading(false);
//     });
// };
