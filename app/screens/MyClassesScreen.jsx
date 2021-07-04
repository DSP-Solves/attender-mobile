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
  classListItem: {
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 12,
    height: 80,
    justifyContent: "space-evenly",
    marginVertical: 8,
    paddingHorizontal: 12,
  }
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
        <Text style={styles.heading}>Select from the following classes.</Text>
      </View>

      <FlatList
        style={styles.classList}
        data={allClasses}
        refreshing={listRefreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={
            () => navigation.navigate(routes.MARK_ATTENDANCE_SCREEN, { myClass: item })
          }>
            <View style={styles.classListItem}>
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
      name: "Mathematics",
    },
    {
      id: "18-MNO",
      name: "English",
    },
    {
      id: "16-DEF",
      name: "Basketball",
    }
  ],
};
