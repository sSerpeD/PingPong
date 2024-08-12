import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Loading() {
  return (
    <View className="" style={{height: hp(15), width: wp(100), marginTop: hp(-5)}}>
      <LottieView style={{flex: 1}} source={require('../assets/animations/loading.json')} autoPlay loop/>
  </View>

  )
}