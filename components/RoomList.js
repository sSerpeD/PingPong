import { View, FlatList } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import RoomItem from './RoomItem';

export default function RoomList({ users }) {
  const router = useRouter();

  // Sort the users array by name
  const sortedUsers = users.slice().sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View className="flex-1">
      <FlatList
        data={sortedUsers}
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 25,
          paddingHorizontal: 10,
        }}
        keyExtractor={(item) => item.id}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <View
            style={{
              width: '33%',
              padding: 5,
              alignItems: 'center',
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
