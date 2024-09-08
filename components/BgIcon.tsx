import { View, Text } from 'react-native'
import React from 'react'

interface BgIconProps {
    name: string;
    color: string;
    size: number;
    BGColor: string;
}

const BgIcon: React.FC<BgIconProps> = ({name, color, size, BGColor}) => {
  return (
    <View className='h-8 w-8 items-center justify-center rounded-md'>
      <Text>BgIcon</Text>
    </View>
  )
}

export default BgIcon