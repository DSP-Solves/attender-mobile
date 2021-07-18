import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, SafeAreaView } from "react-native";
import Constants from "expo-constants";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  view: {
    flex: 1,
  },
});

export default function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  );
}

Screen.propTypes = {
  children: PropTypes.node.isRequired,
};
