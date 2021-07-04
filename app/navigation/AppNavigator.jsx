import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import routes from "./routes";
import AccountNavigator from "./AccountNavigator";
import ClassesNavigator from "./ClassesNavigator";

// Tab Nav

const Tab = createBottomTabNavigator();

// eslint-disable-next-line no-undef
export default AppNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: colors.primary,
      inactiveTintColor: colors.medium,
    }}
  >
    <Tab.Screen
      name={routes.CLASSES_SCREEN}
      component={ClassesNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons color={color} name="clipboard-list" size={size} />
        ),
      }}
    />

    <Tab.Screen
      name={routes.ACCOUNT_SCREEN}
      component={AccountNavigator}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialCommunityIcons color={color} name="account" size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);
