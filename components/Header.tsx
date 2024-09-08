import { View, Text } from 'react-native'
import React from 'react'
import GradientBgIcon from './GradientBgIcon'
import ProfilePic from './ProfilePic'
import { icons } from "@/constant";

interface HeaderProps{
    title?: string
}

const Header: React.FC<HeaderProps> = ({title}) => {
  return (
    <View className='p-5 flex flex-row items-center justify-between'>
        <GradientBgIcon name={icons.menu} color='#333333' width={16} height={16} />
      <Text className='text-2xl font-semibold text-white'>{title}</Text>
        <ProfilePic/>
    </View>
  )
}

export default Header