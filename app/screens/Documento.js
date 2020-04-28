import React, { Component,useState } from "react";
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
} from "react-native";
import HTML from "react-native-render-html";
import Firmar from "../components/Firmar/Firmar"
import { RNSlidingButton, SlideDirection } from "rn-sliding-button";
import Modal from "../components/modal";
import SesionForm from "../components/Login/sesionForm";


export default function Documento(props) {
  
  const htmlContent = props.docString
  //console.log(props);
  
  const [renderComponent, setRenderComponent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const onSlideRight=()=>{
    setRenderComponent(true);
    setIsVisibleModal(true);
  }
  return (
    <ScrollView style={{ flex: 1 }}>
      <HTML
        html={htmlContent}
        imagesMaxWidth={Dimensions.get("window").width}
        containerStyle={styles.htmlstyle}
      />
      <RNSlidingButton
        style={styles.slidingButtom}
        height={35}
        onSlidingSuccess={() => {
          onSlideRight();
        }}
        slideDirection={SlideDirection.RIGHT}
      >
        <View>
          <Text numberOfLines={1} style={styles.titleText}>
            DESLIZA PARA FIRMAR >
          </Text>
        </View>
      </RNSlidingButton>
      {renderComponent && (
        <Modal
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          hide={true}
          bckgrColor={"rgba(0, 0, 0, 0)"}
        >
          {
            <Firmar
              setRenderComponent={setRenderComponent}
            
            />
          }
        </Modal>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  htmlstyle: {
    marginLeft: 15,
    marginEnd: 15,
  },
  titleText: {
    fontSize: 17,
    fontWeight: "normal",
    textAlign: "center",
    color: "#ffffff",
  },
  slidingButtom: {
    width: "100%",
    alignContent: "center",
    flex: 1,
  },
});
//https://reactnativecode.com/create-pdf-file-using-html-text-in-react-native-android-ios-example/
