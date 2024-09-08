import { View, Text, Image } from 'react-native'
import React from 'react'

const ProfilePic = () => {
  return (
    <View className='h-8 w-8 rounded-full border-2 border-gray-600 shadow-lg shadow-black items-center justify-center overflow-hidden'>
      <Image source={require('../assets/app_images/avatar.png')} className='h-8 w-8' />
    </View>
  )
}

export default ProfilePic