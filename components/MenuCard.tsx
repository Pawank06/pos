import { MenuItem } from '@/app';
import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

interface MenuCardProps {
  item: MenuItem; 
  handleAddItem: (item: MenuItem) => void; 
  addedItems: number[];
}


const MenuCard: React.FC<MenuCardProps> = ({ item, handleAddItem, addedItems }) => (
  <View className="bg-stone-900 border border-gray-300/10 rounded-2xl shadow-lg p-3 mb-4" style={{ width: '48%' }}>
    <Image
      source={{ uri: item.image }}
      className="h-24 w-full rounded-xl mb-2"
      style={{ resizeMode: 'cover' }}
    />
    <Text className="text-center text-white text-base font-bold" numberOfLines={1}>
      {item.title}
    </Text>
    <View className="flex-row justify-between items-center mt-1">
      <Text className="text-gray-300 text-sm">{Math.floor(Math.random() * (500 - 100 + 1)) + 100} cals</Text>
      <View className="flex-row items-center">
        <Text className="text-gray-300 text-sm">{(Math.random() * (5 - 1) + 1).toFixed(1)}</Text>
        <Text className="text-green-500 ml-1">★</Text>
      </View>
    </View>
    <View className="flex-row justify-between items-center mt-2">
      <Text className="text-lg text-white font-bold">{item.price}$</Text>
      <TouchableOpacity
        className={`${addedItems.includes(item.id) ? 'bg-stone-700/50' : 'bg-green-600'
          } px-3 py-1 rounded-full`}
        disabled={addedItems.includes(item.id)}
        onPress={() => handleAddItem(item)}
      >
        <Text className="text-xs text-white font-medium">{addedItems.includes(item.id) ? 'Added' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default MenuCard;
