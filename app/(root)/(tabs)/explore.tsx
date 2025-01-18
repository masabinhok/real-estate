import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Explore() {
  const params = useLocalSearchParams<{ query?: string, filter?: string }>();

  const { data: properties, loading: propertiesLoading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      query: params.query!,
      filter: params.filter!,
      limit: 20
    }
  })

  useEffect(() => {
    refetch({
      query: params.query!,
      filter: params.filter!,
      limit: 20
    })
  }, [params.query, params.filter])

  const handleCardPress = (id: string) => {
    router.push(`/properties/${id}`)
  }

  return (
    <SafeAreaView className="h-full bg-white">
      <FlatList
        data={properties}
        renderItem={({ item }) => <Card item={item} onPress={() => handleCardPress(item.$id)} />}
        keyExtractor={(item) => item.$id}
        numColumns={2}
        contentContainerClassName="pb-32"
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          propertiesLoading ? (
            <View className="flex items-center w-full justify-center h-80">
              <ActivityIndicator size="large" className="mt-5 text-primary-300" />
            </View>
          ) : <NoResults />
        }
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <TouchableOpacity className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center" onPress={() => router.back()}>
                <Image source={icons.backArrow} className="size-5" />
              </TouchableOpacity>
              <Text className="font-rubik-medium  text-center text-base mr-2 text-black-300">Search for Your Dream Home</Text>
              <Image source={icons.bell} className="size-6" />
            </View>
            <Search />
            <View className="mt-5">
              <Filters />
              <Text className="text-xl font-rubik-bold mt-5 text-black-300">
                Found {properties?.length} Properties
              </Text>

            </View>
          </View>
        } />
    </SafeAreaView>
  );
}
