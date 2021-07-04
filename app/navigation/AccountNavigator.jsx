import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AccountScreen from "../screens/AccountScreen";
import routes from "./routes";

const Stack = createStackNavigator();

export default AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.ACCOUNT_SCREEN} component={AccountScreen} />
  </Stack.Navigator>
);
