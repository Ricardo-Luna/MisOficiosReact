import React, { Component, useEffect, useState, useRef } from "react";
import { Icon } from "react-native-elements";
import { View, StyleSheet, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ActionButton from "react-native-action-button";
import RBSheet from "react-native-raw-bottom-sheet";
import OficiosCardView from "../components/Oficios/OficioCardView";
import Carpetas from "../components/Carpetas/Carpetas";
import Loading from "../components/Loading";
import { Actions } from "react-native-router-flux";

export default function Oficios(props) {
  const [carpetas, setCarpetas] = useState(
    "a65465fd-6a5a-49b3-95dd-3fc5bb3a71f5"
  );
  const [loading, setLoading] = useState(false);
  const refRBSheet = useRef();
  const { setCarpetaActual } = props;
  return (
    <View>
      <OficiosCardView carpeta={carpetas} setLoading={setLoading} />
      <ActionButton buttonColor="#46babc" offsetY={10} offsetX={10}>
        <ActionButton.Item
          buttonColor="#00b0e1"
          onPress={() => {
            refRBSheet.current.open();
          }}
        >
          <Icon
            name={"folder"}
            backgroundColor="transparent"
            type="material-community"
            color="black"
          />
        </ActionButton.Item>
        <ActionButton.Item buttonColor="#6fb74d">
          <Icon
            name={"help"}
            backgroundColor="transparent"
            type="material-community"
            color="black"
          />
        </ActionButton.Item>
        <ActionButton.Item buttonColor="#d52f89">
          <Icon
            name={"magnify"}
            backgroundColor="transparent"
            type="material-community"
            color="black"
          />
        </ActionButton.Item>
        <ActionButton.Item buttonColor="#f08119">
          <Icon
            name={"account-arrow-left"}
            backgroundColor="transparent"
            type="material-community"
            color="black"
          />
        </ActionButton.Item>
      </ActionButton>

      <RBSheet
        ref={refRBSheet}
        height={300}
        duration={500}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "grey"
          }
        }}
      >
        <Carpetas
          setCarpetaID={setCarpetas}
          setCarpetaActual={setCarpetaActual}
        />
      </RBSheet>
      <Loading text="Cargando Archivos" isVisible={loading} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonsheet: {
    flex: 1,
    justifyContent: "flex-end"
    //backgroundColor: "transparent"
  },
  viewScreen: {
    flex: 1,
    flexDirection: "column"
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: "white"
  }
});
