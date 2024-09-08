import { router, useLocalSearchParams } from 'expo-router';
import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LottieView from 'lottie-react-native';
import { useCart } from '@/context/context';

const OrderScreen: React.FC = () => {
  const animation = useRef<LottieView>(null);
  const { customerName, totalAmount, selectedTable } = useLocalSearchParams();
  const {clearCart} = useCart()

  const handleClearNavigate = () => {
    clearCart()
    router.navigate('/')
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-stone-950 p-4">
      {/* Order Confirmation Section */}
      <View className="bg-stone-900 p-6 rounded-lg shadow-lg border border-stone-200/10 items-center">
        <Text className="text-green-600 text-2xl font-bold mb-4">Order Confirmed!</Text>

        {/* Animation */}
        <LottieView
          ref={animation}
          source={require('../../assets/animations/order.json')}
          autoPlay
          loop={true}
          style={{ width: 150, height: 150 }}
        />

        {/* Order Info */}
        <Text className="text-stone-300 text-xl font-semibold mt-4">Thanks for your order!</Text>
        <View className="mt-6">
          {/* Order Info */}
          <View className="flex-row justify-between items-center w-full mt-2">
            <Text className="text-stone-400 text-lg">Order Number:</Text>
            <Text className="font-bold text-white text-lg">{'45802983021'}</Text>
          </View>

          <View className="flex-row justify-between items-center w-full mt-2">
            <Text className="text-stone-400 text-lg">Customer:</Text>
            <Text className="text-white font-medium text-lg">{customerName}</Text>
          </View>

          <View className="flex-row justify-between items-center w-full mt-2">
            <Text className="text-stone-400 text-lg">Table Number:</Text>
            <Text className="text-white font-medium text-lg">{selectedTable || 'N/A'}</Text>
          </View>

          {/* Total Amount */}
          <Text className="text-white font-bold text-2xl mt-4 text-center">Total: {totalAmount} $</Text>
        </View>

      </View>

      {/* Done Button */}
      <TouchableOpacity
        className="bg-green-600 py-4 px-12 rounded-full mt-8"
        onPress={handleClearNavigate}
      >
        <Text className="text-white font-bold  w-full">Order Something Else</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OrderScreen;
