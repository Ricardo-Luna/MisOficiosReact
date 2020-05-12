import React, { useEffect, useState } from "react";
//import { ScrollView } from "react-native-gesture-handler";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import axios from "react-native-axios";
import Moment from "moment";

export default function OficiosCardView(props) {
  const { busqueda } = props;
  const [docs, setDocs] = useState([]);
  const [actualizar, setActualizar] = useState([]);
  const [loadMore, setLoadMore] = useState(true);
  const [nextPage, setNextPage] = useState("");
  const [hasMore, setHasMore] = useState(false);
  const { carpeta, setLoading, idUs } = props;
  const cadenaConexion = "http://10.0.0.17/ApiMisOficios";
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
  //console.log(props);

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

  const fetchDocs = async () => {
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

  const fetchDoc = async (id) => {
    fetch(`http://10.0.0.17/ApiMisOficios/api/Documentos/{${id}}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        // console.log(response);

        {
          response.documentoHTML
            ? Actions.documento({
                docString: response.documentoHTML,
              })
            : console.log("Documento para borrador");
        }
      })
      .then();
  };

  useEffect(() => {
    fetchDocs();
  }, [carpeta, busqueda]);
  const dateFormater = (dt) => {
    Moment.locale("en");
    return <Text>{Moment(dt).format("d/MM/YYYY  HH:mm")}</Text>; //basically you can do all sorts of the formatting and others
  };
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
    >
      {docs.map((u, i) => {
        {
          // console.log(docs);
        }
        return (
          <TouchableOpacity
            key={i}
            onPress={() => {
              fetchDoc(u.IdDocumento);
            }}
          >
            {
              //  console.log(u.IdDocumento)
            }
            <Card
              key={i}
              title={u.Estatus === 3 ? `● ${u.Asunto}` : `${u.Asunto}`}
              titleStyle={u.Estatus === 3 ? styles.noLeido : styles.leido}
            >
              {/*Padre del componente */}
              <View accessibilityRole="button" style={styles.noLeido}>
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

                  <Text> {dateFormater(u.FechaCreacion)} |</Text>
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
                    {
                      //console.log(u.Asunto+": "+u.Estatus)
                    }
                    <Icon
                      name={u.Estatus === 0 ? "eye-outline" : "eye-check"}
                      type="material-community"
                      color="black"
                      reverseColor="black"
                    />
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
          <Text>Fin de la lista</Text>
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
  titleUnread: {},
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
