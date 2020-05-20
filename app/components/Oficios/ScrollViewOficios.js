import React, { Component } from "react";
import { ScrollView } from "react-native";
export default class ScrollViewOficios extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    <ScrollView
      ref="_scrollview"
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
