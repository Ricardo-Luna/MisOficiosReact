import React, { useState } from "react";
import { Router, Scene } from "react-native-router-flux";

import Splash from "./screens/Splash";
import Oficios from "./screens/Oficios";

export default App = () => {
  const [carpetaActual, setCarpetaActual] = useState("");
  return (
    <Router>
      <Scene key="root">
        <Scene key="splash" component={Splash} back={false} hideNavBar={true} />

        <Scene
          key="oficios"
          renderLeftButton={() => null}
          title={carpetaActual}
          component={Oficios}
          back={false}
          hideNavBar={false}
        />
      </Scene>  
    </Router>
  );
};
