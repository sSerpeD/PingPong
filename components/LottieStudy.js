import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Study({ size }) {
  const dimension = hp(size);
  const innerDimension = dimension * 0.75; // 75% of the outer circle

  return (
    <View
      style={{
        backgroundColor: 'rgba(5, 51, 5, 0.59)', // Semi-transparent background
        borderRadius: dimension / 2,
        height: dimension,
        width: dimension,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden', // Ensures the Lottie animation fits within the circle
      }}
    >
      <View
        style={{
          height: innerDimension,
          width: innerDimension,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LottieView
          style={{
            height: '100%',
            width: '100%',
          }}
          source={require('../assets/animations/study.json')}
          autoPlay
          loop
        />
      </View>
    </View>
  );
}
