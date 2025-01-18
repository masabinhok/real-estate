import { Card, FeaturedCard } from "@/components/Cards";
import Filters from "@/components/Filters";
import NoResults from "@/components/NoResults";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import { getProperties } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import { useAppwrite } from "@/lib/useAppwrite";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();
  const params = useLocalSearchParams<{ query?: string, filter?: string }>();

  const { data: latestProperties, loading: latestPropertiesLoading } = useAppwrite({ fn: getProperties, })

  const { data: properties, loading: propertiesLoading, refetch } = useAppwrite({
    fn: getProperties,
    params: {
      query: params.query!,
      filter: params.filter!,
      limit: 6
    }
  })

  useEffect(() => {
    refetch({
      query: params.query!,
      filter: params.filter!,
      limit: 6
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
        ListHeaderComponent={<View className="px-5">
          <View className="flex flex-row items-center justify-between mt-5">
            <View className="flex flex-row">
              <Image source={{ uri: user?.avatar }} className="size-12 rounded-full" />
              <View className="flex flex-col items-start ml-2 justify-center">
                <Text className="text-xs font-rubik text-black-100">Good Morning</Text>
                <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
              </View>
            </View>
            <Image className="size-6" source={icons.bell} />
          </View>
          <Search />
          <View className="my-5 ">
            <View className="flex flex-row items-center justify-between">
              <Text className="text-xl font-rubik-bold text-black-300">
                Featured
              </Text>
              <TouchableOpacity>
                <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
              </TouchableOpacity>
            </View>
            {
              latestPropertiesLoading ? (<View className="flex items-center w-full justify-center h-80">
                <ActivityIndicator size="large" className="mt-5 text-primary-300" />
              </View>) : !latestProperties || latestProperties.length === 0 ? <NoResults /> : (<FlatList
                horizontal
                data={latestProperties}
                renderItem={({ item }) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)} />}
                keyExtractor={(item) => item.$id}
                showsHorizontalScrollIndicator={false}
                bounces={false}
                contentContainerClassName="flex items-center w-full gap-5 mt-5"
              />)
            }
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xl font-rubik-bold text-black-300">
              Our Recommendation
            </Text>
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
            </TouchableOpacity>
          </View>
          <Filters />
        </View>} />
    </SafeAreaView>
  );
}
