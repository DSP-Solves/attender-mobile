import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";

const App = () => (
  <NavigationContainer theme={navigationTheme}>
    <AppNavigator />
  </NavigationContainer>
);

export default App;
