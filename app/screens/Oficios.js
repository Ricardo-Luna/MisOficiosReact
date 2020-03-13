import React, { Component, useEffect, useState, useRef } from "react";
import { Icon } from "react-native-elements";
import { View, StyleSheet, Button } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import ActionButton from "react-native-action-button";
import RBSheet from "react-native-raw-bottom-sheet";
import OficiosCardView from "../components/Oficios/OficioCardView";
import Carpetas from "../components/Carpetas/Carpetas";
import { Actions } from "react-native-router-flux";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Warning: componentwillreceiveprops",
  "Setting a timer"
]);
export default function Oficios() {
  const refRBSheet = useRef();
  return (
    <View>
      <OficiosCardView />
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
        <ActionButton.Item buttonColor="#f08119" onPress={Actions.splash()}>
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
        <Carpetas />
      </RBSheet>
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
