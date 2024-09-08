import { useCart } from '@/context/context';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen: React.FC = () => {
  const { cart, totalAmount, removeItemFromCart, updateItemQuantity } = useCart();
  const [orderType, setOrderType] = useState<'Dine In' | 'Take Away'>('Dine In');
  const [customerName, setCustomerName] = useState<string>('');
  const [error, setError] = useState('');
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [isTableModalVisible, setIsTableModalVisible] = useState<boolean>(false);
  const [isTakeAwayModalVisible, setIsTakeAwayModalVisible] = useState<boolean>(false); // New state for Take Away modal

  const tax = (totalAmount * 0.1).toFixed(2);

  const availableTables = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5'];

  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItemFromCart(itemId);
    } else {
      updateItemQuantity(itemId, newQuantity);
    }
  };

  const handleTableSelect = (table: string) => {
    setSelectedTable(table);
    setIsTableModalVisible(false);
  };

  const handleProcessPayment = () => {
    if (customerName.trim() === '') {
      setError('Customer Name is required.');
    } else {
      setError('');
      router.push({
        pathname: '/order',
        params: {
          customerName,
          selectedTable,
          orderType,
          totalAmount: (totalAmount + Number(tax)).toFixed(2),
        },
      });
      console.log('Customer Name submitted:', customerName);
    }
  };

  // Function to handle Take Away actions
  const handleTakeAway = () => {
    setIsTakeAwayModalVisible(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-stone-950 p-4">
      {/* Order Type Toggle */}
      <View className="flex-row justify-between items-center bg-stone-900 p-1 rounded-full mb-4">
        <TouchableOpacity
          onPress={() => {
            setOrderType('Dine In');
            setSelectedTable(null); // Reset table when Dine In is selected
          }}
          className={`flex-1 p-3 rounded-full ${orderType === 'Dine In' ? 'bg-[#2B2B2A] shadow-md' : ''}`}
        >
          <Text className={`text-center ${orderType === 'Dine In' ? 'text-white font-bold' : 'text-stone-500'}`}>
            Dine In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setOrderType('Take Away');
            handleTakeAway(); // Trigger Take Away modal or action
          }}
          className={`flex-1 p-3 rounded-full ${orderType === 'Take Away' ? 'bg-[#2B2B2A] shadow-md' : ''}`}
        >
          <Text className={`text-center ${orderType === 'Take Away' ? 'text-white font-bold' : 'text-stone-500'}`}>
            Take Away
          </Text>
        </TouchableOpacity>
      </View>

      {/* Customer Information */}
      <View className="p-4 rounded-lg shadow-sm">
        <Text className="text-white text-lg font-bold mb-2">Customer Information</Text>
        <Text className="text-red-500">{error}</Text>
        <TextInput
          placeholder="Customer Name"
          placeholderTextColor="#78716c"
          value={customerName}
          onChangeText={setCustomerName}
          className="bg-stone-800 p-3 border border-white/10 text-stone-200 rounded-lg mb-3"
        />

        {orderType === 'Dine In' && (
          <TouchableOpacity
            onPress={() => setIsTableModalVisible(true)}
            className="bg-stone-800 p-3 border border-white/10 rounded-lg"
          >
            <Text className="text-stone-200">
              {selectedTable ? `Selected Table: ${selectedTable}` : 'Select Table'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Items List */}
      <FlatList
        data={cart}
        keyExtractor={(item) => item.id.toString()}
        className="p-4"
        renderItem={({ item }) => (
          <View className="bg-stone-900 rounded-xl border border-white/10 p-4 mb-3 shadow-sm flex-row items-center">
            <Image source={{ uri: item.image }} className="h-20 w-20 rounded-lg mr-3" />
            <View className="flex-1">
              <Text className="font-bold text-white">{item.title}</Text>
              <Text className="text-stone-500">{item.price} ₸</Text>
              <View className="flex-row w-[130px] py-1 rounded-full bg-stone-800 border border-white/10 items-center mt-2 justify-center">
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="px-4 py-1 items-center bg-green-600 rounded-full"
                >
                  <Text className="text-lg font-bold text-white">-</Text>
                </TouchableOpacity>
                <Text className="px-4 text-white">{item.quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="px-4 py-1 items-center bg-green-600 rounded-full"
                >
                  <Text className="text-lg text-center font-bold text-white">+</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />

      {/* Order Summary */}
      <View className="p-4 shadow-sm">
        <View className="bg-stone-800 border border-white/10 px-4 py-4 rounded-lg mb-4">
          <View className="flex-row justify-between mb-2">
            <Text className="text-stone-300">Subtotal</Text>
            <Text className="font-bold text-white">{totalAmount} $</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-stone-300">Tax (10%)</Text>
            <Text className="font-bold text-white">{tax} $</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-stone-300">Total</Text>
            <Text className="font-bold text-white">{(totalAmount + Number(tax)).toFixed(2)} $</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleProcessPayment} className="bg-green-600 py-4 rounded-full">
          <Text className="text-center text-white font-bold">Process Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Table Selection Modal */}
      <Modal transparent={true} visible={isTableModalVisible} onRequestClose={() => setIsTableModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-stone-900 rounded-lg p-4 w-80">
            <Text className="text-lg font-bold text-stone-100 mb-4">Select a Table</Text>
            <ScrollView>
              {availableTables.map((table) => (
                <TouchableOpacity
                  key={table}
                  onPress={() => handleTableSelect(table)}
                  className="p-3 bg-stone-800 rounded-lg mb-2 border border-white/10"
                >
                  <Text className="text-center text-stone-500">{table}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity onPress={() => setIsTableModalVisible(false)} className="mt-4 p-3 bg-stone-100 rounded-lg">
              <Text className="text-center text-black">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Take Away Modal */}
      <Modal transparent={true} visible={isTakeAwayModalVisible} onRequestClose={() => setIsTakeAwayModalVisible(false)}>
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-stone-900 rounded-lg p-4 w-80">
            <Text className="text-lg font-bold text-stone-100 mb-4">Confirm Take Away Order</Text>
            <Text className="text-stone-300 mb-4">
              Please confirm that you want to proceed with a Take Away order.
            </Text>
            <TouchableOpacity onPress={() => setIsTakeAwayModalVisible(false)} className="mt-4 p-3 bg-green-600 rounded-lg">
              <Text className="text-center text-white">Confirm</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsTakeAwayModalVisible(false)} className="mt-4 p-3 bg-stone-100 rounded-lg">
              <Text className="text-center text-black">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CartScreen;
