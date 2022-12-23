import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  MapPinIcon,
  QuestionMarkCircleIcon,
  StarIcon,
} from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import DishRow from '../components/DishRow'

const RestaurantScreen = () => {
  const navigation = useNavigation()
  // To get all the params passed i.e route.params.id or route.params.title etc
  // const { route } = useRoute()

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <ScrollView>
      <View>
        <Image
          source={{ uri: urlFor(imgUrl).url() }}
          className="w-full h-[300px]"
        />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-14 left-5 p-2"
        >
          <ArrowLeftIcon size={20} color="#00CCBB" />
        </TouchableOpacity>

        <View className="bg-white">
          <Image
            source={{
              uri:
                'https://github.com/olan-tayo/Food-delivery/blob/main/assets/mr%20emi.jpg',
            }}
          />
          <View className="px-4 pt-4 ">
            <Text className="text-3xl font-bold">{title}</Text>
            <View className="flex-row space-x-2 my-1">
              <View className="flex-row items-center space-x-1">
                <StarIcon color="green" size={22} opacity={0.5} />
                <Text className="text-sm text-gray-500">
                  <Text className="text-green-500">{rating}</Text> . {genre}
                </Text>
              </View>

              <View className="flex-row items-center space-x-1">
                <MapPinIcon color="green" size={22} opacity={0.4} />
                <Text className="text-sm text-gray-500">
                  <Text className="text-green-500">Nearby . {address}</Text>
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 mt-2 pb-4">{short_description}</Text>

            <TouchableOpacity className="flex-row items-center space-x-2 pl-1 pr-4  py-4 border-y border-gray-300 mb-4">
              <QuestionMarkCircleIcon color="gray" opacity={0.6} size={20} />
              <Text className="pl-2 flex-1 text-md font-bold">
                Have a food allergy?
              </Text>
              <ChevronRightIcon color="#00CCBB" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View className=" bg-white">
        <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

        {dishes.map((dish, index) => {
          return (
            <View key={index}>
              <DishRow
                id={dish._id}
                name={dish.name}
                description={'Description here'}
                price={6000}
                image={dish.image}
              />
            </View>
          )
        })}
      </View>
    </ScrollView>
  )
}

export default RestaurantScreen
