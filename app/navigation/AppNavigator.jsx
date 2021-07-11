import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";
import routes from "./routes";
import AccountNavigator from "./AccountNavigator";
import ClassesNavigator from "./ClassesNavigator";

// Tab Nav

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
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
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              color={color}
              name="clipboard-list"
              size={size}
            />
          ),
        }}
      />

      <Tab.Screen
        name={routes.ACCOUNT_SCREEN}
        component={AccountNavigator}
        options={{
          // eslint-disable-next-line react/prop-types
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              color={color}
              name="account"
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
