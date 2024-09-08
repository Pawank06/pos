import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import Header from '@/components/Header';
import { useCart } from '@/context/context';
import { router } from 'expo-router';
import { icons } from '@/constant';
import Loader from '@/components/Loader';
import MenuCard from '@/components/MenuCard';

interface Order {
  id: number;
  name: string;
  status: string;
  items: number;
  table: number;
}

export interface MenuItem {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity: number; // Add this property
}


const orders: Order[] = [
  { id: 1, name: 'Vinicius Bayu', status: 'Ready to Serve', items: 3, table: 3 },
  { id: 2, name: 'Kylian Rex', status: 'Waiting', items: 2, table: 5 },
  { id: 3, name: 'Ed Berni', status: 'Completed', items: 5, table: 2 },
  { id: 4, name: 'Ed Smith', status: 'Cancelled', items: 1, table: 4 },
];

const statusColors = {
  'Ready to Serve': 'bg-green-500',
  'Waiting': 'bg-yellow-500',
  'Completed': 'bg-blue-500',
  'Cancelled': 'bg-red-500',
};

const OrderListScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'Food' | 'Snack'>('Food');
  const [foodItems, setFoodItems] = useState<MenuItem[]>([]);
  const [snackItems, setSnackItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [addedItems, setAddedItems] = useState<number[]>([]);
  const scrollY = new Animated.Value(0);

  const { addItemToCart, totalAmount, cart, clearCart } = useCart();
  
  // cb6f1bb487f942b58e78017cc89c209e
  // Spoonacular API key
  const API_KEY = ''; 
  
  const FOOD_API_URL = `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`;
  const SNACK_API_URL = `https://api.spoonacular.com/food/products/search?query=snack&number=10&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const foodResponse = await axios.get(FOOD_API_URL);
        const snackResponse = await axios.get(SNACK_API_URL);

        setFoodItems(
          foodResponse.data.recipes.map((recipe: any) => ({
            id: recipe.id,
            title: recipe.title,
            price: Math.floor(Math.random() * 20) + 5,
            image: recipe.image,
          }))
        );

        setSnackItems(
          snackResponse.data.products.map((product: any) => ({
            id: product.id,
            title: product.title,
            price: Math.floor(Math.random() * 10) + 2,
            image: product.image,
          }))
        );

        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data from Spoonacular API', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Reset addedItems when cart is cleared
  useEffect(() => {
    if (cart.length === 0) {
      setAddedItems([]); // Reset added items when the cart is empty
    }
  }, [cart]);

  const menuItems = selectedTab === 'Food' ? foodItems : snackItems;

  const handleAddItem = (item: MenuItem) => {
    addItemToCart(item);
    setAddedItems((prev) => [...prev, item.id]);
  };

  // Interpolating opacity and height based on scrollY value
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 260],
    outputRange: [260, 0],
    extrapolate: 'clamp',
  });

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false }
  );

  const handleClearNavigate = () => {
    clearCart(); // Clear all items from the cart
    setAddedItems([]); // Reset the local addedItems state
    router.navigate('/'); // Navigate to the home page
  };

  if (loading) {
    return (
     <Loader/>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {/* Animated Header */}
      <Animated.View style={{ opacity: headerOpacity, height: headerHeight, overflow: 'hidden' }}>
        <Header />
        <View className="bg-black p-4">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="text-lg font-bold text-white">Order List</Text>
            <TouchableOpacity onPress={() => router.navigate('OrderDetails' as never)}>
              <Text className="text-blue-500">See All</Text>
            </TouchableOpacity>
          </View>

          {/* Order List */}
          <FlatList
            data={orders}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => {
              const statusColor = statusColors[item.status as keyof typeof statusColors] || 'bg-gray-500';

              return (
                <View className="bg-stone-900 py-4 px-4 rounded-xl border border-gray-300/10 mr-4 shadow-lg overflow-hidden">
                  <View className="mb-2">
                    <Text className="text-sm text-white font-bold">{item.name}</Text>
                    <Text className="text-white/70 text-xs">{item.items} items • Table {item.table}</Text>
                  </View>
                  <View className={`text-white ${statusColor} px-2 py-1 text-xs rounded-full items-center`}>
                    <Text className="text-white text-xs">{item.status}</Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </Animated.View>

      {/* Product List */}
      <View className="flex-1 p-4 bg-transparent mt-1 shadow-slate-50 shadow-xl rounded-t-3xl border border-gray-300/10">
        <View className="flex-row justify-around bg-stone-900 p-1.5 rounded-full border">
          <TouchableOpacity
            className={`flex-1 p-3 ${selectedTab === 'Food' ? 'bg-[#2B2B2A]' : ''} rounded-full shadow-md`}
            onPress={() => setSelectedTab('Food')}
          >
            <Text className={`text-center text-base font-semibold ${selectedTab === 'Food' ? 'text-white' : 'text-stone-500'}`}>
              Food
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 p-3 ${selectedTab === 'Snack' ? 'bg-[#2B2B2A]' : ''} rounded-full shadow-md`}
            onPress={() => setSelectedTab('Snack')}
          >
            <Text className={`text-center text-base font-semibold ${selectedTab === 'Snack' ? 'text-white' : 'text-stone-500'}`}>
              Snack
            </Text>
          </TouchableOpacity>
        </View>

        {/* Menu Items */}

        <FlatList
          data={menuItems}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          keyExtractor={(item) => item.id.toString()}
          className="p-2 pt-3 mb-14"
          renderItem={({ item }) => (
            <MenuCard addedItems={addedItems} handleAddItem={handleAddItem} item={item} key={item.id}  />
          )}
          onScroll={onScroll}
        />
      </View>

      {/* Proceed Button */}
      <View className="absolute bottom-0 w-full rounded-full px-4">
        <TouchableOpacity
          className="bg-green-600 px-6 py-4 rounded-full flex-row justify-between items-center bottom-9"
          onPress={() => router.navigate('/cart')}
        >
          <View className="flex flex-row items-center justify-center">
            <Image source={icons.cart} className="w-4 h-4 mr-2" />
            <Text className="text-white text-base font-bold">$ {totalAmount}</Text>
          </View>
          <Text className="text-white text-base font-medium">Proceed Transaction</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OrderListScreen;
