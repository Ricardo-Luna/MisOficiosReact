import React, { Component,useEffect, useState } from "react";
import {
  View,
  Text,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Card, Icon } from "react-native-elements";
import { Actions } from "react-native-router-flux";
import axios from "react-native-axios";
import SVMethods from '../Oficios/SVMethods'
import Moment from "moment";
export default class ScrollViewOficios extends Component {
  constructor(props) {
    super(props);
    const { busqueda, updateList, setUpdateList } = props;
    const [docs, setDocs] = useState([]);
    // const [actualizar, setActualizar] = useState([])
    const [loadMore, setLoadMore] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);
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
  }
  wait(timeout) {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  }
  handleMore = async () => {
    //if(hasMore){}
    setLoadMore(true);
    let httpReq = cadenaConexion + nextPage;
    // console.log(httpReq);
    await axios
      .get(httpReq)
      .then((response) => {var checked = "";
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
  fetchDocs = async () => {
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
  
  dateFormater = (dt) => {
    Moment.locale("en-us");
    return <Text>{Moment(dt).format("D/M/YYYY  HH:mm")}</Text>; //basically you can do all sorts of the formatting and others
  };

  
  
  fetchDoc = async (id, tipo, status) => {
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
                tipo: tipo,
                updateList: updateList,
                setUpdateList: setUpdateList,
                id: idUs,
                IdDoc: id,
                status: status,
              })
            : console.log("Documento para borrador");
        }
      })
      .then();
  };

  render() {
    <ScrollView
      ref="_scrollview"
      onScrollBeginDrag={()=>{

      }}
      
      persistentScrollbar={false}
      //ref={(scrollView) => {
      //  //Sometimes ref can be null so we check it.
      //  if (scrollView !== null && this.scrollView !== scrollView) {
      //    this.scrollView = scrollView;
      //    scrollView.scrollTo({ x: 100 });
      //  }
      //}}

      centerContent={true}
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
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {console.log("Documentos")}
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
              fetchDoc(u.IdDocumento, u.Tipo, u.Estatus);
            }}
          >
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

                  <Text>
                    {" "}
                    {u.Tipo === 1
                      ? dateFormater(u.FechaCreacion)
                      : dateFormater(u.FechaEnvio)}{" "}
                    |
                  </Text>
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
                    {u.Tipo === 1 && (
                      <Icon
                        name={"playlist-edit"}
                        type="material-community"
                        color="black"
                      />
                    )}
                    <Icon
                      name={
                        u.Estatus === 2
                          ? "arrow-up-bold-box-outline"
                          : "arrow-down-bold-box-outline"
                      }
                      type="material-community"
                      color={u.Estatus === 2 ? "#03c04a" : "#20B2AA"}
                      reverseColor="black"
                    />

                    {
                      //  console.log(u.IdDocumento)
                    }
                    {u.Tipo > 1 && (
                      <Icon
                        name={
                          u.Leido === 2 && u.Tipo >= 2 ? "eye-check" : "eye-off"
                        }
                        type="material-community"
                        color={u.Leido === 2 ? "#20B2AA" : "black"}
                        reverseColor="black"
                      />
                    )}
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
    </ScrollView>;
  }
}
