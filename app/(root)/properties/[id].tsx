import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import icons from '@/constants/icons';
import { facilities, gallery } from '@/constants/data';

const Basility = ({ icon, title, quantity }: { icon: any, title: string, quantity: number }) => {
  return (
    <View className='flex flex-row items-center gap-2'>
      <View className='bg-primary-100 rounded-full p-3 '>
        <Image source={icon} className='size-4' />
      </View>
      <Text className='text-sm text-black-300 font-rubik-semibold'>{quantity}{" "}{title}</Text>
    </View>
  )
}

const Facilites = ({ icon, title }: { icon: any, title: string }) => {
  return (
    <View className='flex flex-col gap-2 w-[22%] items-center'>
      <View className='p-4 rounded-full bg-primary-100'>
        <Image source={icon} className='size-7' />
      </View>
      <Text numberOfLines={1} className='font-rubik text-black-300 text-sm'>{title}</Text>
    </View>
  )
}

const basilities = [
  {
    title: "beds",
    icon: icons.bed,
    quantity: 8
  },
  {
    title: "bath",
    icon: icons.bath,
    quantity: 3
  },
  {
    title: "sqft",
    icon: icons.area,
    quantity: 2000
  },
]

const Property = () => {
  const { id } = useLocalSearchParams();
  return (
    <SafeAreaView>
      <ScrollView className='bg-white h-full'>
        <View className='relative'>
          <Image source={images.newYork} className='w-full h-[460px]' resizeMode='cover' />
          <View className='absolute top-0 left-0 right-0 flex flex-row justify-between py-3 px-6'>
            <Image source={icons.backArrow} className='size-7' />
            <View className='flex flex-row gap-5'>
              <Image source={icons.heart} className='size-7' tintColor="#191D31" />
              <Image source={icons.send} className='size-7' />
            </View>
          </View>
        </View>
        <View className='px-5 py-6 gap-[30px] flex flex-col'>
          {/* About property */}
          <View className='flex flex-col gap-4'>
            <Text className='text-2xl font-rubik-bold text-black-300'>Modernica Apartment</Text>
            <View className='flex flex-row justify-start items-center gap-2.5'>
              <Text className='text-primary-300 font-rubik-semibold text-xs bg-primary-100 py-1.5 px-2.5 rounded-2xl '>APARTMENT</Text>
              <View className='flex flex-row gap-1.5 items-center '>
                <Image source={icons.star} className='size-5' />
                <Text className='text-sm text-black-200 font-rubik-medium'>4.8 (1,275 reviews)</Text>
              </View>
            </View>
            <View className='flex flex-row items-center justify-between'>
              {basilities.map((item, index) => (
                <Basility key={index} {...item} />))}
            </View>
          </View>
          {/* About agent */}
          <View className='flex flex-col gap-4'>
            <Text className='font-rubik-bold text-xl text-black-300'>
              Agent
            </Text>
            <View className='flex flex-row  gap-3'>
              <View className='flex flex-row gap-5 items-center flex-1'>
                <Image source={images.avatar} className='size-[60px]' resizeMode='contain' />
                <View className='gap-1 flex flex-col'>
                  <Text className='font-rubik-bold text-lg text-black-300'>Natasya Wildora</Text>
                  <Text className='text-sm font-rubik-semibold text-black-200'>Owner</Text>
                </View>
              </View>
              <View className='flex flex-row items-center gap-5'>
                <Image source={icons.chat} className='size-7' />
                <Image source={icons.phone} className='size-7' />
              </View>
            </View>
          </View>

          {/* Overview */}
          <View className='flex flex-col gap-3 '>
            <Text className='text-black-300 font-rubik-bold text-xl'>
              Overview
            </Text>
            <Text className='text-black-200 font-rubik text-base leading-[27.2px]'>
              This is a modern apartment located in the heart of New York City. The apartment is fully furnished and has a great view of the city
            </Text>
          </View>

          {/* Facilites */}
          <View className='flex flex-col gap-5'>
            <Text className='font-rubik-bold text-xl text-black-300' >Facilities</Text>
            <View className='flex flex-row flex-wrap gap-2 justify-between'>
              {
                facilities.map((item, index) => (
                  <Facilites key={index} {...item} />
                ))
              }
            </View>
          </View>
          {/* Gallery */}
          <View className='flex flex-col gap-5'>
            <Text className='font-rubik-bold text-xl text-black-300' >Gallery</Text>
            <View className='flex flex-row justify-between'>
              {gallery.map((item) => (
                <Image key={item.id} source={item.image} className='aspect-square w-[118px] rounded-xl ' resizeMode='cover' />
              ))}
            </View>
          </View>

          {/* Location */}

          <View className='flex flex-col gap-5'>
            <Text className='font-rubik-bold text-black-300 text-xl'>Location</Text>
            <View className='flex flex-row  gap-2'>
              <Image source={icons.location} className='size-5' />
              <Text className='text-sm font-rubik-medium text-black-200'>Grand City St. 100, New York, United States</Text>
            </View>
            <View className='relative'>
              <Image source={images.map} className='w-full h-[200px]' resizeMode='cover' />
              <Image />
            </View>

          </View>

          {/* Reviews */}

          <View className='flex flex-col gap-6'>
            <View className='flex flex-row gap-3 items-center rounded-1.5'>
              <View className='flex-1 flex flex-row gap-3 items-center'>
                <Image source={icons.star} className='size-6  -top-[1.5px] left-[2px]' />
                <Text className='font-rubik-extrabold text-black-300 text-xl'>4.8 (1,275 reviews)</Text>
              </View>
              <Text className='text-primary-300 font-rubik-bold text-base'>
                See All
              </Text>
            </View>
            <View className='flex flex-col gap-3'>
              <View className='gap-2.5 flex flex-row items-center'>
                <Image source={images.avatar} className='size-10' resizeMode='cover' />
                <Text className='font-rubik-bold text-base leading-[22.4px]'>Charlotte Hanlin</Text>
              </View>
              <Text className='text-base font-rubik text-black-200 leading-[27.2px]'>The apartment is very clean and modern. I really like the interior design. Looks like I'll feel at home😍</Text>
              <View className='flex flex-row items-center justify-between '>
                <View className='flex flex-row gap-2 items-center'>
                  <View className='size-5'>
                    <Image source={icons.heart} className='size-[15px]' tintColor="#0061FF" />
                  </View>
                  <Text className='font-rubik-medium text-sm text-primary-300'>938</Text>
                </View>
                <Text className='font-rubik text-sm text-black-100'>2 days ago</Text>
              </View>
            </View>

          </View>


        </View>
        {/* Price */}
        <View className='border border-primary-100 h-[110px] rounded-tr-[36px] rounded-tl-[36px] pt-6 px-6 pb-9'>
          <View className='flex flex-row gap-[60px]'>
            <View className='flex flex-col gap-2'>
              <Text className='text-xs font-rubik-medium text-black-200'>PRICE</Text>
              <Text className='text-2xl font-rubik-bold text-primary-300'>$17821</Text>
            </View>
            <TouchableOpacity className='bg-primary-300 rounded-full py-3.5 px-4 flex-1 flex items-center justify-center'>
              <Text className='text-white font-rubik-bold text-base text-center'>Booking Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Property