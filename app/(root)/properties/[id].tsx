import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';
import images from '@/constants/images';
import icons from '@/constants/icons';
import { facilities, gallery } from '@/constants/data';
import { useAppwrite } from '@/lib/useAppwrite';
import { getPropertiesById } from '@/lib/appwrite';
import Comment from '@/components/Comment';

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


const Property = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data: property, loading: propertyLoading } = useAppwrite({
    fn: getPropertiesById,
    params: { id }
  })


  if (propertyLoading) {
    return (
      <View className='flex items-center w-full justify-center h-80'>
        <ActivityIndicator size='large' className='mt-5 text-primary-300' />
      </View  >
    )
  }

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
            <Text className='text-2xl font-rubik-bold text-black-300'>{property?.name}</Text>
            <View className='flex flex-row justify-start items-center gap-2.5'>
              <Text className='text-primary-300 font-rubik-semibold text-xs bg-primary-100 py-1.5 px-2.5 rounded-2xl '>{property?.type}</Text>
              <View className='flex flex-row gap-1.5 items-center '>
                <Image source={icons.star} className='size-5' />
                <Text className='text-sm text-black-200 font-rubik-medium'>{property?.rating}{" "}({property?.reviews.length} reviews)</Text>
              </View>
            </View>
            <View className='flex flex-row items-center justify-between'>
              <Basility icon={icons.bed} title={`Bed${property?.bedrooms.length > 0 ? "s" : ""}`} quantity={property?.bedrooms} />
              <Basility icon={icons.bath} title="Bath" quantity={property?.bathrooms} />
              <Basility icon={icons.area} title="sqft" quantity={property?.area} />
            </View>
          </View>
          {/* About agent */}
          <View className='flex flex-col gap-4'>
            <Text className='font-rubik-bold text-xl text-black-300'>
              Agent
            </Text>
            <View className='flex flex-row  gap-3'>
              <View className='flex flex-row gap-5 items-center flex-1'>
                <Image source={{ uri: property?.agent.avatar }} className='size-14 rounded-full' />
                <View className='gap-1 flex flex-col'>
                  <Text className='font-rubik-bold text-lg text-black-300'>{property?.agent.name}</Text>
                  <Text className='text-sm font-rubik-semibold text-black-200'>{property?.agent.email}</Text>
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
              {property?.description}
            </Text>
          </View>

          {/* Facilities */}
          <View className="mt-7">
            <Text className="text-black-300 text-xl font-rubik-bold">
              Facilities
            </Text>

            {property?.facilities.length > 0 && (
              <View className='flex flex-row flex-wrap items-start justify-start mt-2 gap-5'>
                {
                  property?.facilities.map((item: string, index: number) => {
                    const facility = facilities.find(
                      (facility) => facility.title === item
                    );

                    return (
                      <View
                        key={index}
                        className='flex flex-1 flex-col items-center min-w-16 max-w-20'
                      >
                        <View className='size-14 bg-primary-100 rounded-full flex items-center justify-center'>
                          <Image source={facility?.icon} className='size-6' />
                        </View>
                        <Text
                          numberOfLines={1}
                          className='text-black-300 text-sm text-center font-rubik mt-1.5'
                          ellipsizeMode='tail'>
                          {item}
                        </Text>
                      </View>
                    )
                  })
                }
              </View>
            )
            }
          </View>

          {/* Gallery */}
          {/* <View className='flex flex-col gap-5'>
            <Text className='font-rubik-bold text-xl text-black-300' >Gallery</Text>
            <View className='flex flex-row justify-between'>
              {gallery.map((item) => (
                <Image key={item.id} source={item.image} className='aspect-square w-[118px] rounded-xl ' resizeMode='cover' />
              ))}
            </View>
          </View> */}

          {property?.gallery.length > 0 && (
            <View className='mt-7'>
              <Text className='font-rubik-bold text-black-300 text-xl'>Gallery</Text>
              <FlatList
                contentContainerStyle={{ paddingRight: 20 }}
                data={property?.gallery}
                keyExtractor={(item) => item.$id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Image source={{ uri: item.image }} className='size-40 rounded-xl' />
                )}
                contentContainerClassName='flex gap-4 mt-3'
              />
            </View>
          )}

          {/* Location */}

          <View className='flex flex-col gap-5'>
            <Text className='font-rubik-bold text-black-300 text-xl'>Location</Text>
            <View className='flex flex-row  gap-2'>
              <Image source={icons.location} className='size-5' />
              <Text className='text-sm font-rubik-medium text-black-200'>
                {property?.address}
              </Text>
            </View>
            <View className='relative'>
              <Image source={images.map} className='w-full h-[200px]' resizeMode='cover' />
              <Image />
            </View>

          </View>

          {/* Reviews */}
          {
            property?.reviews.length > 0 && (
              <View className='mt-7'>
                <View className='flex flex-row items-center justify-between'>
                  <View className="flex flex-row items-center">
                    <Image source={icons.star} className="size-6" />
                    <Text className="text-black-300 text-xl font-rubik-bold ml-2">
                      {property?.rating} ({property?.reviews.length} reviews)
                    </Text>
                  </View>
                  <TouchableOpacity>
                    <Text className="text-primary-300 text-base font-rubik-bold">
                      View All
                    </Text>
                  </TouchableOpacity>
                </View>
                <View className="mt-5">
                  <Comment item={property?.reviews[0]} />
                </View>
              </View>
            )
          }
        </View>

        {/* Price */}
        <View className='border border-primary-100 h-[110px] rounded-tr-[36px] rounded-tl-[36px] pt-6 px-6 pb-9'>
          <View className='flex flex-row gap-[60px]'>
            <View className='flex flex-col gap-2'>
              <Text className='text-xs font-rubik-medium text-black-200'>PRICE</Text>
              <Text numberOfLines={1} className='text-2xl font-rubik-bold text-primary-300'>${property?.price}</Text>
            </View>
            <TouchableOpacity className='bg-primary-300 rounded-full py-3.5 px-4 flex-1 flex items-center justify-center'>
              <Text className='text-white font-rubik-bold text-base text-center'>Book Now</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Property