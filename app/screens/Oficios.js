import React, { Component, useEffect, useState } from "react";

import { View, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BottomSheet from "reanimated-bottom-sheet";
import OficiosCardView from "../components/Oficios/OficioCardView";
import Carpetas from "../components/Carpetas/Carpetas";
import Header from "../components/Carpetas/Header";

export default function Oficios() {
  const renderHeader = () => {
    <Header />;
  };
  return (
    <ScrollView>
      <OficiosCardView />

      <View>
        <BottomSheet snapPoints={[300, 200, 0]} renderHeader={renderHeader()} />
        {bottomSheetRef.current.snapTo(10)}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
