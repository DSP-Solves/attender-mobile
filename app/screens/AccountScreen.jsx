import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import PropTypes from "prop-types";

import Screen from "../components/Screen";

import colors from "../config/colors";
import routes from "../navigation/routes";

const menuItems = [
  {
    title: "My Classes",
    icon: {
      name: "clipboard-list",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.CLASSES_SCREEN,
  },
  {
    title: "Help",
    icon: {
      name: "help-box",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.CLASSES_SCREEN,
  },
];

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  menuLabel: {
    marginLeft: 12,
    fontSize: 24,
  },
  menuOption: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 12,
  },
  menuItemSeparator: {
    height: 4,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default function AccountScreen({ navigation }) {
  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate(item.targetScreen)}
            >
              <View style={styles.menuOption}>
                <MaterialCommunityIcons
                  name={item.icon.name}
                  color={item.icon.backgroundColor}
                  size={24}
                />
                <Text style={styles.menuLabel}>{item.title}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          ItemSeparatorComponent={() => (
            <View style={styles.menuItemSeparator} />
          )}
        />
      </View>

      <TouchableWithoutFeedback onPress={() => console.log("logout")}>
        <View style={styles.menuOption}>
          <MaterialCommunityIcons
            name="logout-variant"
            color={colors.primary}
            size={24}
          />
          <Text style={styles.menuLabel}>Logout</Text>
        </View>
      </TouchableWithoutFeedback>
    </Screen>
  );
}

AccountScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
