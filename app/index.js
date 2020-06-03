import React from "react";
import { Router, Scene } from "react-native-router-flux";

import Splash from "./screens/Splash";
import Oficios from "./screens/Oficios";
import Documento from "./screens/Documento";


export default App = () => {
  return (
    <Router>
      <Scene key="root">
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
         // navBar={CustomNavBar}
          hideNavBar={false}
          back={false}
        />
        <Scene key="documento" back={true} component={Documento} />
      </Scene>
    </Router>
  );
};
