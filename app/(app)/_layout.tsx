import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import HomeHeader from "@/components/HomeHeader";
import HomeFooter from "@/components/HomeFooter";

export default function _layout() {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="home/index"
          options={{ header: () => <HomeHeader /> }}
        />
      </Stack>
      <HomeFooter />
    </>
  );
}
