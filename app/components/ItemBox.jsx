import React from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import PropTypes from "prop-types";

import colors from "../utils/colors";

const styles = StyleSheet.create({
  absentBox: {
    alignItems: "center",
    backgroundColor: colors.red,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 15,
    height: 80,
    justifyContent: "center",
    marginLeft: 12,
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  container: {
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 12,
    height: 80,
    justifyContent: "space-evenly",
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  presentBox: {
    alignItems: "center",
    backgroundColor: colors.green,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 15,
    height: 80,
    justifyContent: "center",
    marginRight: 12,
    marginVertical: 8,
    paddingHorizontal: 12,
  },
});

export default function ItemBox({ data, markAbsent, markPresent }) {
  const leftSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={markPresent} activeOpacity={0.6}>
        <View style={styles.presentBox}>
          <Animated.Text style={{ transform: [{ scale }] }}>
            Present
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  const rightSwipe = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });

    return (
      <TouchableOpacity onPress={markAbsent} activeOpacity={0.6}>
        <View style={styles.absentBox}>
          <Animated.Text style={{ transform: [{ scale }] }}>
            Absent
          </Animated.Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable
      friction={1.75}
      overshootLeft={false}
      overshootRight={false}
      renderLeftActions={leftSwipe}
      renderRightActions={rightSwipe}
      onSwipeableRightOpen={() => Vibration.vibrate(60)}
      onSwipeableOpen={(e) => console.log({ e })}
    >
      <View style={styles.container}>
        <Text>{data.id}</Text>
        <Text>{data.name}</Text>
      </View>
    </Swipeable>
  );
}

ItemBox.propTypes = {
  data: PropTypes.object.isRequired,
  markAbsent: PropTypes.func.isRequired,
  markPresent: PropTypes.func.isRequired,
};
