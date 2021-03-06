import React from "react";
import { StyleSheet } from "react-native";
import { Overlay } from "react-native-elements";

export default function Modal(props) {
  const { isVisible, setIsVisible,hide, children,bckgrColor } = props;

  const closeModal = () => setIsVisible(!hide);

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor={"rgba(0,0,0,.4)"}
      overlayBackgroundColor={bckgrColor}
      overlayStyle={styles.overlay}
      onBackdropPress={closeModal}
    >
      {children}
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "auto",
    width: "90%",
  
    shadowColor:"rgba(0, 0, 0, .4)"
  }
});