import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import {
  Control,
  Controller,
  FieldErrors,
  FieldValues,
  Path,
} from "react-hook-form";
import { COLORS } from "@/lib/constants/colors";
import { ERROR_TEXT } from "@/lib/constants/font";

interface FormInputControllerProps<T extends FieldValues> {
  control: Control<T>;
  errors?: FieldErrors<T>;
  name: Path<T>; // This ensures `name` is a valid key of `T`
  placeholder: string;
  leftIcon?: JSX.Element; // Optional left icon prop
  rightIcon?: JSX.Element; // Optional right icon prop
  inputHeight?: number;
  props?: TextInputProps;
}

export default function FormInputController<T extends FieldValues>({
  control,
  errors,
  name,
  placeholder,
  leftIcon,
  rightIcon,
  inputHeight,
  props,
}: FormInputControllerProps<T>) {
  const [isFocused, setIsFocused] = useState(false); // State to track focus

  const hasError = Boolean(errors && errors[name]); // Check if there is an error for the field

  return (
    <>
      <View style={styles.inputWrapper}>
        {leftIcon && <View style={styles.leftIconStyle}>{leftIcon}</View>}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={COLORS.decentAltText}
              style={[
                styles.input,
                {
                  height: inputHeight || 50,
                  paddingLeft: leftIcon ? 40 : 10, // Adjust padding for left icon
                  paddingRight: rightIcon ? 40 : 10, // Adjust padding for right icon
                  borderWidth:
                    isFocused || hasError ? 1 : StyleSheet.hairlineWidth,
                  borderColor: hasError
                    ? COLORS.red
                    : isFocused
                    ? COLORS.decentPrimary
                    : undefined, // Dynamic border color
                },
              ]}
              value={value}
              onBlur={() => {
                onBlur();
                setIsFocused(false); // Update focus state
              }}
              onFocus={() => setIsFocused(true)} // Update focus state
              onChangeText={onChange}
              {...props}
            />
          )}
        />
        {rightIcon && <View style={styles.rightIconStyle}>{rightIcon}</View>}
      </View>

      {/* Error Text */}
      {errors && errors[name] && (
        <Text style={[ERROR_TEXT]}>{errors[name]?.message as string}</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    position: "relative",
    width: "100%",
  },
  input: {
    padding: 10,
    width: "100%",
    marginTop: 10,
    height: 47,
    backgroundColor: COLORS.decentAlt,
    color: COLORS.white,
  },
  leftIconStyle: {
    position: "absolute",
    left: 10,
    top: 23,
    zIndex: 1000,
  },
  rightIconStyle: {
    position: "absolute",
    right: 10,
    top: 23,
    zIndex: 1000,
  },
});
