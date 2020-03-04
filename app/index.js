import React from "react";
import { Router, Scene } from "react-native-router-flux";

import Splash from './screens/Splash'
import Oficios from './screens/Oficios'

export default App = () => {
  return (
    <Router>
      <Scene key="root">
        <Scene key="splash" component={Splash}  back={false} />
        <Scene key="oficios" component={Oficios}  back={false}/>
      </Scene>
    </Router>
  );
};

