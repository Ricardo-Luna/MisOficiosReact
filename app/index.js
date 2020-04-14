import React, { useState } from "react";
import { Router, Scene } from "react-native-router-flux";

import Splash from "./screens/Splash";
import Oficios from "./screens/Oficios";
import Documento from "./screens/Documento";
import CardView from "./components/Oficios/OficioCardView";
import Card from "./tests/Card";
import { StyleSheet } from "react-native";

export default App = () => {
  return (
    <Router>
      <Scene key="root" >
        <Scene
          key="splash"
          component={Splash}
          back={false}
          hideNavBar={true}
          onLeft={true}
        />

        <Scene
          key="oficios"
          renderLeftButton={() => null}
          title={"Recibidos"}
          component={Oficios}
          hideNavBar={false}
          back={true}
          type="reset"
        />

        <Scene key="documento" hideNavBar={true} component={Documento} />
      </Scene>
    </Router>
  );
};
