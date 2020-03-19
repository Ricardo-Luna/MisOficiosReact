import React, { useState } from "react";
import { Router, Scene } from "react-native-router-flux";

import Splash from "./screens/Splash";
import Oficios from "./screens/Oficios";
import CardView from "./components/Oficios/OficioCardView"
import Card from "./tests/Card"
export default App = () => {
  const [carpetaActual, setCarpetaActual] = useState("Recibidos");
  return (
    <Router>
      <Scene key="root">
        <Scene key="splash" component={Splash} back={false} hideNavBar={true}  />

        <Scene
          key="oficios"
          renderLeftButton={() => null}
          setCarpetaActual={setCarpetaActual}
          title={carpetaActual}
          component={Oficios}
          back={false}
          hideNavBar={false}
          onBack={()=>{console.log("salsipuedes")}}
          
        />
        
      </Scene>  
    </Router>
  );
};
