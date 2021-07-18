import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  FlatList,
  LayoutAnimation,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
  Platform,
  Modal,
  TouchableHighlight,
  Alert,
  TextInput,
} from "react-native";
import PropTypes from "prop-types";
import * as DocumentPicker from "expo-document-picker";

import colors from "../utils/colors";
import apiClient from "../api/client";

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
  },
  touchableOpacityStyle: {
    position: "absolute",
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    right: 24,
    bottom: 24,
    borderRadius: 50,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 12,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default function MyClassesScreen({ navigation, classes }) {
  const [listRefreshing, setListRefreshing] = useState(false);
  const [newClassModalVisible, setNewClassModalVisible] = useState(false);
  const [newClassData, setNewClassData] = useState(null);
  const [newClassName, setNewClassName] = React.useState("name of class");
  const [newSubjectName, setNewSubjectName] = React.useState("name of subject");

  const [allClasses, setAllClasses] = useState(classes);

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

  const clickHandler = async () => {
    const docPicked = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
    });

    if (docPicked.type === "success") {
      try {
        const file = {
          name: docPicked.name,
          size: docPicked.size,
          type: "text/csv",
          uri: docPicked.uri,
        };

        const formData = new FormData();
        formData.append("name", docPicked.name);
        formData.append("file", file);

        const apiResponse = await apiClient.post(
          "/conversion/csv2json",
          formData,
        );

        if (apiResponse.ok) {
          setNewClassModalVisible(true);
          setNewClassData(apiResponse.data);
        } else {
          console.error(apiResponse.originalError);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          Select from the following classes.
        </Text>
      </View>

      <FlatList
        style={styles.classList}
        data={allClasses}
        refreshing={listRefreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(routes.MARK_ATTENDANCE_SCREEN, {
                myClass: item,
              })
            }
          >
            <View style={styles.classListItem}>
              <Text>{item.id}</Text>
              <Text>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={clickHandler}
        style={styles.touchableOpacityStyle}
      >
        <MaterialCommunityIcons
          name="plus-circle"
          size={56}
          color={colors.red}
        />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent
        visible={newClassModalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Data import successful. Please provide a name for this
              class.
            </Text>
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 12,
                padding: 6,
                width: 240,
              }}
              onChangeText={(text) => setNewClassName(text)}
              value={newClassName}
            />
            <TextInput
              style={{
                height: 40,
                borderColor: "gray",
                borderWidth: 1,
                borderRadius: 12,
                padding: 6,
                width: 240,
                marginTop: 8,
              }}
              onChangeText={(text) => setNewSubjectName(text)}
              value={newSubjectName}
            />

            <View
              style={{
                flexDirection: "row",
                marginTop: 12,
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: colors.red,
                  width: "30%",
                  borderBottomRightRadius: 0,
                  borderTopRightRadius: 0,
                }}
                onPress={() =>
                  setNewClassModalVisible(!newClassModalVisible)
                }
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={{
                  ...styles.openButton,
                  backgroundColor: colors.blue,
                  width: "70%",
                  borderBottomLeftRadius: 0,
                  borderTopLeftRadius: 0,
                }}
                onPress={() => {
                  const newClass = {
                    id: newClassName,
                    name: newSubjectName,
                    students: newClassData,
                  };
                  setAllClasses([...classes, newClass]);
                  navigation.navigate(routes.MARK_ATTENDANCE_SCREEN, {
                    myClass: newClass,
                  });
                  setNewClassModalVisible(false);
                }}
              >
                <Text style={styles.textStyle}>
                  {/* eslint-disable-next-line react/jsx-curly-brace-presence */}
                  {"Save & Mark Attendance"}
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

MyClassesScreen.propTypes = {
  classes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      students: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
      ),
    }),
  ),
};

MyClassesScreen.defaultProps = {
  classes: [
    {
      id: "17-XYZ",
      name: "Mathematics",
      students: [{ id: "17-XYZ-01", name: "Ramanujan" }],
    },
    {
      id: "18-MNO",
      name: "English",
      students: [{ id: "18-MNO-01", name: "Shashi" }],
    },
    {
      id: "16-DEF",
      name: "Basketball",
      students: [{ id: "16-DEF-01", name: "Dwayne" }],
    },
  ],
};
