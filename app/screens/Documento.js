import React, { Component, useState, useEffect } from "react";
import {
  ScrollView,
  Dimensions,
  StyleSheet,
  View,
  Text,
  BackHandler,
} from "react-native";
import HTML from "react-native-render-html";
import Firmar from "../components/Firmar/Firmar";
import { RNSlidingButton, SlideDirection } from "rn-sliding-button";
import Modal from "../components/modal";
import { Actions } from "react-native-router-flux";
import axios from "react-native-axios";
import SesionForm from "../components/Login/sesionForm";
const screenHeight = Math.round(Dimensions.get("window").height);
const screenwidth = Math.round(Dimensions.get("window").width);

export default function Documento(props) {
  const {
    tipo,
    updateList,
    setUpdateList,
    status,
    id,
    IdDoc,
    setLoading,
  } = props;
  const htmlContent = props.docString;

  const [renderComponent, setRenderComponent] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const onSlideRight = () => {
    setRenderComponent(true);
    setIsVisibleModal(true);
  };

  useEffect(() => {
    const act = () => {};

    const backHandler = BackHandler.addEventListener("docsBackPress", () => {
      Actions.pop();
    });

    return () => {
      backHandler.remove();
    };
  }, []);

  getOrientation = () => {
    if (screenwidth < screenHeight) {
     // console.log("Horizontal");
      return "Horizontal";
    } else {
    //  console.log("Vertical");
      return "Vertical";
    }
  };

  const checkRead = () => {
    fetch(
      `http://10.0.0.17/ApiMisOficios/api/Documentos/${IdDoc}/MarcarLeido/${id}`,
      {
        method: "PUT",
      }
    )
      .then((response) => {
        console.log(
          `http://10.0.0.17/ApiMisOficios/api/Documentos/${IdDoc}/MarcarLeido/${id}`
        );

        console.log(response.status);
        setUpdateList(updateList + 1);
      })
      .catch((response) => console.log(response));
  };
  return (
    <ScrollView style={styles.scrollStyle}>
      {status <= 3 && checkRead()}
      {setLoading(false)}
      {console.log(getOrientation())}
      <HTML
        html={htmlContent}
        imagesMaxWidth={Dimensions.get("window").width + 1200}
        containerStyle={styles.htmlstyle}
      />
      {tipo === 1 && (
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
      )}

      {renderComponent && (
        <Modal
          isVisible={isVisibleModal}
          setIsVisible={setIsVisibleModal}
          hide={true}
          bckgrColor={"rgba(0, 0, 0, 0)"}
        >
          {<Firmar setRenderComponent={setRenderComponent} />}
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
  scrollStyle: {
    flex: 1,
    //width: "200%",
  },
});
//https://reactnativecode.com/create-pdf-file-using-html-text-in-react-native-android-ios-example/
