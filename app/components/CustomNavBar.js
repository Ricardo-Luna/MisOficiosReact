import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Divider, Icon, Input } from "react-native-elements";
const screenHeight = Math.round(Dimensions.get("window").height) / 10;
const screenwidth = Math.round(Dimensions.get("window").width) / 2;
export default class CustomNavBar extends Component {
    constructor(props){
        this.state={
            
        }
    }
  render() {
    return (
      <View style={styles.navBar}>
        <Divider style={styles.div} height={5} />
        <View style={styles.inView}>
          <Icon
            name={"comment-search-outline"}
            type="material-community"
            style={styles.iconSearch}
            color="gray"
            size={screenHeight / 2}
          />
          <View style={styles.innerView}>
            <Icon
              name={"folder-multiple"}
              type="material-community"
              style={styles.icons}
              color="gray"
              size={screenHeight / 2}
            />
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  navBar: {
    height: screenHeight / 1.5,
    flexDirection: "column",
  },

  inView: {
    //position: "absolute",
    //alignItems: "center",
    flexDirection: "row",

    //marginHorizontal: 80,
  },
  innerView: { 
      marginLeft: screenwidth / 1.4 
    },
  texto: {
    alignSelf: "center",
    marginBottom: 15,
    flex: 2,
  },
  icons: {
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
  },
  iconSearch: {
  
  },
  div: {
    backgroundColor: "gray",
    alignContent: "flex-start",
  },
});
