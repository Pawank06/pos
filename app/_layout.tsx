import { Stack, Tabs } from 'expo-router';
import { Image, ImageSourcePropType, View } from 'react-native';
import { CartProvider } from '@/context/context';

const TabIcon = ({
  source,
  focused,
  color
}: {
  source: ImageSourcePropType;
  focused: boolean;
  color: string
}) => (
  <View
    className={`flex items-center justify-center`}
    style={{
      width: 60,
      height: 60,
      // iOS Shadow for Glow Effect
      shadowColor: focused ? '#FFA001' : 'transparent',  // Orange color for focused
      shadowOpacity: focused ? 0.8 : 0,  // Adjust opacity for glow effect
      shadowRadius: focused ? 10 : 0,  // Increase radius for blur effect
      shadowOffset: { width: 0, height: 0 },  // No offset for shadow
      // Android Elevation for Glow Effect
      elevation: focused ? 15 : 0,  // Higher elevation for stronger glow
    }}
  >
    <Image
      source={source}
      tintColor={color}
      resizeMode="contain"
      className="w-6 h-6"
    />
  </View>
);

export default function Layout() {
  return (
    <CartProvider>
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="cart/index"
        options={{
          title: 'Cart',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="order/index"
        options={{
          title: 'Order',
          headerShown: false,
        }}
      />
    </Stack>
    </CartProvider>
  );
}
