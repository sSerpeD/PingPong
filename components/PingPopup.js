import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from "react-native-responsive-screen";
  import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Modal,
    TouchableWithoutFeedback,
  } from "react-native";
  import React from "react";
  import { Image } from 'expo-image';
  
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  
  export const PopupScreen = ({ members, action, value, icon, isVisible, onClose, pingedUsers, handlePingAll }) => {
    const PopupItem = ({ user }) => {
      const isPinged = pingedUsers.includes(user.userId); // Check if the user is pinged
      return (
        <TouchableOpacity
          style={{
            height: hp(10),
            width: hp(10),
            pointerEvents: isPinged ? 'none' : 'auto' // Disable click if pinged
          }}
          className="flex-col items-center justify-center gap-1"
          onPress={() => action(user)}
        >
          <View style={{
            height: hp(6),
            aspectRatio: 1,
            borderRadius: 1000,
            borderColor: isPinged ? '#b91c1c' : 'transparent', // Red border if pinged
            borderWidth: isPinged ? 3 : 0,
            overflow: 'hidden', // Ensures the border does not overlap the image
          }}>
            <Image
              style={{
                height: '100%',
                width: '100%',
                borderRadius: 1000,
                opacity: isPinged ? 0.5 : 1, // Dimmed if pinged
              }}
              placeholder={blurhash}
              source={{ uri: user.profileUrl }}
            />
          </View>
  
          <Text style={{ fontSize: hp(1.7) }} className="font-semibold text-neutral-600">
            {user.username}
          </Text>
        </TouchableOpacity>
      );
    };
  
    return (
      <Modal visible={isVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.6)]">
            <TouchableWithoutFeedback>
              <View
                style={{
                  width: wp(80),
                  maxHeight: hp(45),
                  borderRadius: hp(2),
                  padding: hp(2),
                }}
                className="bg-white p-4"
              >
                <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                  <View className="flex-wrap flex-row justify-between">
                    {members.map((user, index) => (
                      <PopupItem key={index} user={user} />
                    ))}
                  </View>
                </ScrollView>
  
                <View className="flex-row justify-between mt-4 px-2">
                  <TouchableOpacity
                    style={{
                      width: wp(30),
                      height: hp(6),
                      borderRadius: hp(1),
                    }}
                    className="bg-red-800 justify-center items-center"
                    onPress={handlePingAll} // Call handlePingAll on button press
                  >
                    <Text className="text-white font-semibold">เรียกทุกคน</Text>
                  </TouchableOpacity>
  
                  <TouchableOpacity
                    style={{
                      width: wp(30),
                      height: hp(6),
                      borderRadius: hp(1),
                    }}
                    className="bg-neutral-300 justify-center items-center"
                    onPress={onClose}
                  >
                    <Text className="text-black font-semibold">ปิด</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    );
  };
  