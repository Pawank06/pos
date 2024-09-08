// components/Loader.tsx
import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const Loader = () => (
  <View className="flex-1 justify-center items-center bg-black">
    <ActivityIndicator size="large" color="#FFA001" />
  </View>
);

export default Loader;
