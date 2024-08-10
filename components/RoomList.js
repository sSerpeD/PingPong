import { View, FlatList } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import RoomItem from './RoomItem';

export default function RoomList({ users }) {
  const router = useRouter();

  return (
    <View className="flex-1">
      <FlatList
        data={users}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 25,
          paddingHorizontal: 10, // Padding on the left and right to create space from the screen edges
        }}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: '33%',
              padding: 5,
              alignItems: 'center', // Center the item within its column,
            }}
            className='py-3'
          >
            <RoomItem item={item} index={index} router={router} />
          </View>
        )}
      />
    </View>
  );
}
