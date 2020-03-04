import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from './screens/Splash'
import Oficios from './screens/Oficios'

const MainStack = createStackNavigator({
    Splash: {
        screen: Splash,
        navigationOptions: () => ({
          title: "Splash",
          tabBarVisible: false
        })
      },
      Oficios: {
        screen: Oficios,
        navigationOptions: () => ({
          title: "Oficios",
          tabBarVisible: false
        })
      },
      
},
{
    initialRouteName: "Splash",
    order: ["Restaurants", "Favorites", "TopLists", "Search", "Account"],
    tabBarOptions: {
      inactiveTintColor: "#646464",
      activeTintColor: "#00a680"
    }
  }
  );

export default MainStack

