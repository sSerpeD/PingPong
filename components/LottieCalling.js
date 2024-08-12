import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Study({ size }) {
  const dimension = hp(size);

  return (
    <View
      style={{
        backgroundColor: 'rgba(245, 235, 84, 0.9)', // White with 70% opacity
        borderRadius: dimension / 2,
        height: dimension,
        width: dimension,
        overflow: 'hidden', // Ensures the Lottie animation fits within the circle
      }}
    >
      <LottieView
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
        }}
        source={require('../assets/animations/calling.json')}
        autoPlay
        loop
      />
    </View>
  );
}
