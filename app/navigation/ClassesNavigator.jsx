import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MyClassesScreen from "../screens/MyClassesScreen";
import MarkAttendanceScreen from "../screens/MarkAttendanceScreen";
import routes from "./routes";

const Stack = createStackNavigator();

export default AccountNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name={routes.CLASSES_SCREEN} component={MyClassesScreen} />
    <Stack.Screen name={routes.MARK_ATTENDANCE_SCREEN} component={MarkAttendanceScreen} />
  </Stack.Navigator>
);
