import React from 'react';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Study({ size }) {
  const dimension = hp(size);
  const innerDimension = dimension * 0.75; // 75% of the outer circle

  return (
    // <View
    //   style={{
    //     backgroundColor: 'rgba(5, 51, 5, 0.59)', // Semi-transparent background
    //     borderRadius: dimension / 2,
    //     height: dimension,
    //     width: dimension,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     overflow: 'hidden', // Ensures the Lottie animation fits within the circle
    //     shadowColor: "#000",
    //     shadowOffset: {
    //       width: 0,
    //       height: 2,
    //     },
    //     shadowOpacity: 0.3,
    //     shadowRadius: 0.1,
    //     elevation: 5, // This is for Android
    //   }}
    // >
    // </View>
      <View
      style={{
        backgroundColor: 'rgba(5, 51, 5, 0.65)', // White with 70% opacity
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
          source={require('../assets/animations/study.json')}
          autoPlay
          loop
        />
    </View>
  );
}
