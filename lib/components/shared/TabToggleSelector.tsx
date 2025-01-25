import { COLORS } from "@/lib/constants/colors";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
  ViewStyle,
  TextStyle,
} from "react-native";

type TabOption = {
  label: string;
  value: string | number; // Value to represent the selected option
};

type TabToggleSelectorProps = {
  options: TabOption[];
  tabContainerStyle?: ViewStyle;
  tabTextStyle?: TextStyle;
  activeTabTextStyle?: TextStyle;
  onOptionSelect: (value: string | number) => void; // Callback for selected option
};

const TabToggleSelector: React.FC<TabToggleSelectorProps> = ({
  options,
  tabContainerStyle,
  tabTextStyle,
  activeTabTextStyle,
  onOptionSelect,
}) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const animatedValue = React.useRef(new Animated.Value(0)).current;

  const handleTabPress = (index: number) => {
    setActiveTabIndex(index);
    onOptionSelect(options[index].value);
    Animated.timing(animatedValue, {
      toValue: index,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const widthInterpolation = animatedValue.interpolate({
    inputRange: options.map((_, index) => index),
    outputRange: options.map(
      (_, index) => `${(100 / options.length) * index}%`
    ),
  });

  return (
    <View style={styles.container}>
      <View style={styles.parentTabContain}>
        <View style={[styles.tabContainer, tabContainerStyle]}>
          <Animated.View
            style={[
              styles.slider,
              { left: widthInterpolation, width: `${100 / options.length}%` },
            ]}
          />
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tab}
              onPress={() => handleTabPress(index)}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.tabText,
                  tabTextStyle,
                  activeTabIndex === index
                    ? { ...styles.activeTabText, ...activeTabTextStyle }
                    : {},
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 20,
  },
  parentTabContain: {
    width: "100%",
    backgroundColor: COLORS.decentAlt,
    overflow: "hidden",
    position: "relative",
    padding: 7,
  },
  tabContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: COLORS.decentAlt,
    overflow: "hidden",
    position: "relative",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  tabText: {
    fontSize: 16,
    color: COLORS.decentAltText,
  },
  activeTabText: {
    color: COLORS.white,
  },
  slider: {
    position: "absolute",
    height: "100%",
    backgroundColor: COLORS.decentAltLight,
    flex: 1,
  },
});

export default TabToggleSelector;
