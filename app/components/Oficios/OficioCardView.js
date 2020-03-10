import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Image, Icon } from "react-native-elements";

export default function OficiosCardView() {
  return (
    <View style={styles.layout}>
      <Icon
        style={styles.iconImportance}
        name="archive-arrow-down-outline"
        type="material-community"
        color="black"
        reverseColor="black"
      />
      <Icon
        style={styles.iconImportance}
        name="alert-circle-outline"
        type="material-community"
        color="cyan"
        reverseColor="black"
      />
      <Text> </Text>
      <Text style={styles.folio}>FE/002/2019</Text>
      <Text> </Text>
      <Text>06/12/2019</Text>
      <Text> </Text>
      <Text>09:56</Text>
      <Text> </Text>
      <Icon
        style={styles.iconImportance}
        name="attach-file"
        type="material"
        color="black"
        reverseColor="black"
      />
      <Text> </Text>
      <Icon
        style={styles.iconImportance}
        name="arrow-down-bold-box-outline"
        type="material-community"
        color="black"
        reverseColor="black"
      />
      <Text> </Text>
      <Text style={styles.content}>...</Text>
    </View>
    /* <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5}>
      <Text>Elevation 0</Text>
    </CardView>*/
  );
}
const styles = StyleSheet.create({
  layout: {
    backgroundColor: "powderblue",
    flexDirection: "row"
  },
  iconImportance: {
    alignSelf: "stretch",
    flexDirection: "row",
    position: "absolute"
  },
  folio: {
    justifyContent: 'center',
    alignItems:'center', 
  },
  files: {
    alignSelf: "stretch"
  },
  recieved: {
    alignSelf: "flex-end"
  },
  seen: {
    alignSelf: "flex-end"
  },
  content: {
    flexDirection: "column"
  }
});
