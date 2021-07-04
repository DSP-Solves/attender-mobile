import React, { useState } from "react";
import {
  FlatList,
  LayoutAnimation,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  UIManager,
  View,
  Platform,
} from "react-native";
import PropTypes from "prop-types";

import colors from "../utils/colors";

import routes from "../navigation/routes";

if (Platform.OS === "android") {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

const styles = StyleSheet.create({
  action: {
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  actionsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    marginTop: 8,
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    paddingHorizontal: 16,
  },
  headingContainer: {
    marginTop: 12,
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
  },
  seperatorLine: {
    height: 1,
    backgroundColor: "black",
  },
  classList: {
    marginBottom: 12,
  },
});

export default function MyClassesScreen({ navigation, classes }) {
  const [listRefreshing, setListRefreshing] = useState(false);
  const [allClasses, setAllClasses] = useState(classes);

  const toast = (msg) => {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  };

  const layoutAnimConfig = {
    duration: 300,
    update: {
      type: LayoutAnimation.Types.easeInEaseOut,
    },
    delete: {
      duration: 100,
      type: LayoutAnimation.Types.easeInEaseOut,
      property: LayoutAnimation.Properties.opacity,
    },
  };

  const handleRefresh = () => {
    setListRefreshing(true);
    setAllClasses(classes);
    LayoutAnimation.configureNext(layoutAnimConfig);
    setListRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>My Classes</Text>
      </View>

      <FlatList
        style={styles.classList}
        data={allClasses}
        refreshing={listRefreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate(routes.MARK_ATTENDANCE_SCREEN)}>
            <View>
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

MyClassesScreen.propTypes = {
  classes: PropTypes.array,
};

MyClassesScreen.defaultProps = {
  navigation: PropTypes.object.isRequired,
  classes: [
    {
      id: "17-XYZ",
      name: "Tulip",
      students: [
        { id: "17-XYZ-01", name: "Alpha" },
        { id: "17-XYZ-02", name: "Beta" },
        { id: "17-XYZ-03", name: "Charlie" },
        { id: "17-XYZ-04", name: "Delta" },
        { id: "17-XYZ-05", name: "Echo" },
        { id: "17-XYZ-06", name: "Foxtrot" },
        { id: "17-XYZ-07", name: "Golf" },
        { id: "17-XYZ-08", name: "Hotel" },
        { id: "17-XYZ-09", name: "India" },
        { id: "17-XYZ-10", name: "Juliet" },
        { id: "17-XYZ-11", name: "Kilo" },
        { id: "17-XYZ-12", name: "Lima" },
        { id: "17-XYZ-13", name: "Mike" },
        { id: "17-XYZ-14", name: "November" },
        { id: "17-XYZ-15", name: "Oscar" },
        { id: "17-XYZ-16", name: "Papa" },
        { id: "17-XYZ-17", name: "Quebec" },
        { id: "17-XYZ-18", name: "Romeo" },
        { id: "17-XYZ-19", name: "Sierra" },
        { id: "17-XYZ-20", name: "Tango" },
        { id: "17-XYZ-21", name: "Uniform" },
        { id: "17-XYZ-22", name: "Victor" },
        { id: "17-XYZ-23", name: "Whiskey" },
        { id: "17-XYZ-24", name: "X-Ray" },
        { id: "17-XYZ-25", name: "Yankee" },
        { id: "17-XYZ-26", name: "Zulu" },
      ],
    },
  ],
};
