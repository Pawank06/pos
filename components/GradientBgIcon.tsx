import { View, Text, ImageSourcePropType } from 'react-native'
import React from 'react'
import {LinearGradient} from 'expo-linear-gradient'
import { CustomIcon } from './CustomIcon';

interface GradientBgIconProps{
    name: ImageSourcePropType;
    color: string;
    height: number;
    width: number
}

const GradientBgIcon = ({name, color, height, width}: GradientBgIconProps) => {
  return (
    <View className='rounded-xl shadow-lg shadow-black items-center justify-center overflow-hidden border border-gray-700'>
      <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y:1}} className='h-8 w-8 items-center justify-center' colors={['gray', 'black']}>
        <CustomIcon source={name} height={height} width={width}/>
      </LinearGradient>
    </View>
  )
}

export default GradientBgIcon