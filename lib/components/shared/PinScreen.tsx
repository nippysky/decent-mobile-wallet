import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
} from "react-native";
import { Href, useRouter } from "expo-router";
import * as Haptics from "expo-haptics";
import { FontAwesome5, SimpleLineIcons } from "@expo/vector-icons";
import { HEADING_BOLD } from "@/lib/constants/font";
import ScreenWrapper from "../ScreenWrapper";
import { COLORS } from "@/lib/constants/colors";

const PIN_LENGTH = 5;

type PinScreenProps = {
  title: string;
  nextRoute?: Href;
  onSubmit: (result: string | boolean) => void; // Accepts string or boolean
  validationPin?: string;
  mode: "create" | "confirm" | "validate";
  shakeAnimation?: Animated.Value; // Optional shake animation
  errorMessage?: string; // Optional error message
};

const PinScreen: React.FC<PinScreenProps> = ({
  title,
  nextRoute,
  onSubmit,
  validationPin,
  mode,
  shakeAnimation,
  errorMessage,
}) => {
  const [code, setCode] = useState<number[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (code.length === PIN_LENGTH) {
      const enteredPin = code.join("");

      if (mode === "confirm") {
        if (enteredPin === validationPin) {
          onSubmit(true);
          if (nextRoute) router.push(nextRoute);
        } else {
          onSubmit(false);
          setCode([]);
        }
      } else if (mode === "validate") {
        onSubmit(enteredPin === validationPin);
        setCode([]);
      } else {
        onSubmit(enteredPin);
        if (nextRoute) {
          router.push({
            // @ts-ignore
            pathname: nextRoute,
            params: { pin: enteredPin },
          } as const);
        }
        setCode([]);
      }
    }
  }, [code, mode, validationPin, onSubmit, nextRoute, router]);

  const onNumberPress = (number: number) => {
    if (code.length < PIN_LENGTH) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setCode([...code, number]);
    }
  };

  const onNumberBackSpace = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode(code.slice(0, -1));
  };

  const handleClearAll = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCode([]);
  };

  return (
    <ScreenWrapper>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={[styles.title, HEADING_BOLD]}>{title}</Text>

        {/* PIN Indicator with Shake Animation */}
        <Animated.View
          style={[
            styles.codeView,
            {
              transform: [{ translateX: shakeAnimation || 0 }], // Apply shake animation
            },
          ]}
        >
          {Array(PIN_LENGTH)
            .fill(0)
            .map((_, index) => (
              <View
                key={index}
                style={[
                  styles.codeEmpty,
                  {
                    backgroundColor:
                      index < code.length
                        ? COLORS.decentPrimary
                        : COLORS.decentAltText,
                  },
                ]}
              />
            ))}
        </Animated.View>

        {/* Error Message */}
        {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

        {/* Numeric Keypad */}
        <View style={styles.numbersView}>
          {/* First Row: 1, 2, 3 */}
          {[1, 2, 3].map((number, index) => (
            <TouchableOpacity
              key={index}
              style={styles.numberButton}
              onPress={() => onNumberPress(number)}
              disabled={code.length === PIN_LENGTH}
            >
              <Text style={styles.numberText}>{number}</Text>
            </TouchableOpacity>
          ))}

          {/* Second Row: 4, 5, 6 */}
          {[4, 5, 6].map((number, index) => (
            <TouchableOpacity
              key={index}
              style={styles.numberButton}
              onPress={() => onNumberPress(number)}
              disabled={code.length === PIN_LENGTH}
            >
              <Text style={styles.numberText}>{number}</Text>
            </TouchableOpacity>
          ))}

          {/* Third Row: 7, 8, 9 */}
          {[7, 8, 9].map((number, index) => (
            <TouchableOpacity
              key={index}
              style={styles.numberButton}
              onPress={() => onNumberPress(number)}
              disabled={code.length === PIN_LENGTH}
            >
              <Text style={styles.numberText}>{number}</Text>
            </TouchableOpacity>
          ))}

          {/* Fourth Row: Clear All, 0, Backspace */}
          <View style={styles.bottomRow}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={handleClearAll}
            >
              <SimpleLineIcons name="reload" size={24} color={"white"} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.numberButton}
              onPress={() => onNumberPress(0)}
              disabled={code.length === PIN_LENGTH}
            >
              <Text style={styles.numberText}>0</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={onNumberBackSpace}
            >
              <FontAwesome5 name="backspace" size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default PinScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  title: {
    color: "white",
    textAlign: "center",
    marginTop: 10,
    fontWeight: "bold",
  },
  codeView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    marginVertical: 85,
  },
  codeEmpty: {
    width: 15,
    height: 15,
    borderRadius: 100,
  },
  numbersView: {
    marginHorizontal: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 30,
  },
  numberButton: {
    width: "30%", // Each button takes up 30% of the container width
    aspectRatio: 1, // Make the buttons square
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10, // Add vertical spacing between rows
  },
  numberText: {
    fontSize: 30,
    color: "#fff",
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  controlButton: {
    width: "30%", // Same width as number buttons
    aspectRatio: 1, // Make the buttons square
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
  },
});
