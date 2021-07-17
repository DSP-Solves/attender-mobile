import React, { useState } from "react";
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
} from "react-native";
import PropTypes from "prop-types";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";

// import ItemBox from "../components/ItemBox";
import ItemBoxAnimated from "../components/ItemBoxAnimated";
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
  studentList: {
    marginBottom: 12,
  },
});

export default function MarkAttendanceScreen({
  navigation,
  route,
  students,
}) {
  const { myClass } = route.params;

  const [allStudents, setAllStudents] = useState(myClass.students);
  const [listRefreshing, setListRefreshing] = useState(false);

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

  const markPresent = (id) => {
    allStudents.forEach((student) => {
      if (student.id === id) {
        // eslint-disable-next-line no-param-reassign
        student.status = "present";
      }
    });

    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  const markAbsent = (id) => {
    allStudents.forEach((student) => {
      if (student.id === id) {
        // eslint-disable-next-line no-param-reassign
        student.status = "absent";
      }
    });

    LayoutAnimation.configureNext(layoutAnimConfig);
  };

  const handleRefresh = () => {
    setListRefreshing(true);
    setAllStudents(students);
    LayoutAnimation.configureNext(layoutAnimConfig);
    setListRefreshing(false);
  };

  const handleSubmit = async () => {
    try {
      const apiResponse = await apiClient.post("/mark", {
        identifier: `${myClass.id}_${myClass.name}`,
        studentList: allStudents,
      });

      if (apiResponse.ok && apiResponse.data.success) {
        const downloadResumable = FileSystem.createDownloadResumable(
          `http://192.168.29.212:9107/download/${apiResponse.data.message}`,
          `${FileSystem.documentDirectory}${apiResponse.data.message}`,
        );

        await MediaLibrary.requestPermissionsAsync();

        const downloadedFile = await downloadResumable.downloadAsync();

        const asset = await MediaLibrary.createAssetAsync(
          downloadedFile.uri,
        );

        const album = await MediaLibrary.getAlbumAsync("Download");

        if (album == null) {
          await MediaLibrary.createAlbumAsync(
            "Download",
            asset,
            false,
          );
        } else {
          await MediaLibrary.addAssetsToAlbumAsync(
            [asset],
            album,
            false,
          );
        }

        Sharing.shareAsync(downloadedFile.uri);

        navigation.navigate(routes.CLASSES_SCREEN);
      } else {
        console.error(apiResponse.originalError);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = () => {
    setAllStudents([]);
    handleRefresh();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {`${myClass.id} : ${myClass.name}`}
        </Text>
      </View>

      <FlatList
        style={styles.studentList}
        data={allStudents}
        refreshing={listRefreshing}
        onRefresh={handleRefresh}
        renderItem={({ item }) => (
          <ItemBoxAnimated
            data={item}
            markPresent={() => markPresent(item.id)}
            markAbsent={() => markAbsent(item.id)}
          />
        )}
      />

      <View style={styles.actionsContainer}>
        <View
          style={{
            ...styles.action,
            width: "70%",
            paddingRight: 8,
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.action,
              width: "100%",
              backgroundColor: colors.blue,
            }}
            onPress={handleSubmit}
            activeOpacity={0.6}
          >
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            ...styles.action,
            width: "30%",
            paddingLeft: 8,
          }}
        >
          <TouchableOpacity
            style={{
              ...styles.action,
              width: "100%",
              backgroundColor: colors.lime,
            }}
            onPress={handleReset}
            activeOpacity={0.6}
          >
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

MarkAttendanceScreen.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
  students: PropTypes.array,
};

MarkAttendanceScreen.defaultProps = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
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
};
