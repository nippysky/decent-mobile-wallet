import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BUTTON_TEXT, INFO_TEXT } from "@/lib/constants/font";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import FormInputController from "../shared/FormInputController";
import { SecretPhraseType } from "@/lib/constants/types";
import { twelveSchema } from "@/lib/schema/auth";
import { BUTTONSTYLE } from "@/lib/constants/styles";

export default function TwelveWordsInput() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SecretPhraseType>({ resolver: yupResolver(twelveSchema) });

  const submit = (data: SecretPhraseType) => {
    console.log(data);
  };

  // Render 12 input fields dynamically
  const fields = Array.from({ length: 12 }, (_, index) => {
    const fieldName = [
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "ten",
      "eleven",
      "twelve",
    ][index] as string;

    return (
      <View key={fieldName} style={styles.inputContainers}>
        <FormInputController<SecretPhraseType>
          control={control}
          name={fieldName}
          placeholder=""
          errors={errors}
          leftIcon={<Text style={INFO_TEXT}>{index + 1}.</Text>}
        />
      </View>
    );
  });

  return (
    <View style={{ flex: 1, marginTop: 10 }}>
      {fields}
      <View style={{ marginTop: 50 }}>
        <TouchableOpacity
          style={BUTTONSTYLE}
          activeOpacity={0.5}
          onPress={handleSubmit(submit)}
        >
          <Text style={BUTTON_TEXT}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainers: { marginVertical: 5 },
});
