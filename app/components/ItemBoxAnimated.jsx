import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from "react-native";
import PropTypes from "prop-types";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../utils/colors";

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderColor: colors.grey,
    borderWidth: 1,
    borderRadius: 12,
    height: 90,
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginVertical: 8,
    paddingHorizontal: 12,
  },
  detailsContainer: {
    justifyContent: "space-evenly",
    textTransform: "uppercase",
    width: "75%",
  },
  detailsTextId: {
    fontSize: 18,
  },
  detailsTextName: {
    fontSize: 16,
  },
  statusContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "25%",
  },
  statusText: {
    textTransform: "uppercase",
    fontSize: 18,
  },
});

export default function ItemBox({ data, markAbsent, markPresent }) {
  const ref = useRef();
  const [pan] = useState(new Animated.ValueXY());
  const [color, setColor] = useState(colors.white);
  const [markAs, setMarkAs] = useState("");
  const [iconName, setIconName] = useState("");

  const [panResponder] = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          // eslint-disable-next-line no-underscore-dangle
          x: pan.x._value,
        });
      },
      onPanResponderMove: (_, gesture) => {
        pan.x.setValue(gesture.dx);

        ref.current.measure((x, y, width, height, pageX) => {
          if (pageX > 50 && pageX < 150) {
            setColor(colors.green);
            setMarkAs("present");
            setIconName("check-circle");
          } else if (pageX > -130 && pageX < -50) {
            setColor(colors.red);
            setMarkAs("absent");
            setIconName("close-circle");
          }
        });
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        pan.x.setValue(0);
      },
    }),
  );

  useEffect(() => {
    if (markAs === "present") {
      markPresent(data.id);
    } else if (markAs === "absent") {
      markAbsent(data.id);
    }
  }, [markAs]);

  return (
    <Animated.View
      ref={ref}
      style={[
        styles.container,
        {
          transform: [{ translateX: pan.x }],
        },
        {
          backgroundColor: color,
        },
      ]}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...panResponder.panHandlers}
    >
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTextId}>{data.id}</Text>
        <Text style={styles.detailsTextName}>{data.name}</Text>
      </View>
      <View style={styles.statusContainer}>
        <MaterialCommunityIcons
          color={colors.white}
          name={iconName}
          size={26}
        />
      </View>
    </Animated.View>
  );
}

ItemBox.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
  markAbsent: PropTypes.func.isRequired,
  markPresent: PropTypes.func.isRequired,
};

ItemBox.defaultProps = {
  data: { id: "69-GTM-69", name: "Bruce Wayne" },
};
