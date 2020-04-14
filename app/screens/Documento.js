import React from "react";
import { Text, View, StyleSheet } from "react-native";

export default function Documento() {
  var RNFS = require("react-native-fs");
  var path = RNFS.DocumentDirectoryPath + "/test.txt";

  return (
    <View>
      {RNFS.writeFile(path, "Lorem ipsum dolor sit amet", "utf8")
        .then((success) => {
          console.log("FILE WRITTEN!");
        })
        .catch((err) => {
          console.log(err.message);
        })}
      <Text style={styles.text}>te tai ganando uno tatequieto</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    justifyContent: "center",
    marginTop: 500,
  },
});

//https://reactnativecode.com/create-pdf-file-using-html-text-in-react-native-android-ios-example/