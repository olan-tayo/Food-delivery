import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
  ChevronDownIcon,
  UserIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon,
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import sanityClient from '../sanity'

const HomeScreen = () => {
  const navigation = useNavigation()

  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == "featured"] {
          ...,
           restaurant[] -> {
             ...,
             dishes[] -> {
               ...,
             }
           } 
         }
        `,
      )
      .then((data) => {
        setFeaturedCategories(data)
      })
  }, [])

  return (
    <SafeAreaView className="bg-white pt-5">
      <ScrollView vertical showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex flex-row items-center justify-between">
          <View className="flex flex-row pb-3 items-center mx-4 space-x-2">
            <Image
              source={{
                uri: 'https://links.papareact.com/wru',
              }}
              className="h-7 w-7 bg-gray-300 p-4 rounded-full"
            />

            {/* VIEW ONE */}
            <View>
              <Text className="font-bold text-gray-400 text-sm">
                Deliver Now
              </Text>
              <View className="flex flex-row items-center gap-[6px]">
                <Text className="font-bold text-xl">Current Location</Text>
                <ChevronDownIcon size={20} color="#00CCBB" />
              </View>
            </View>
          </View>

          {/* VIEW TWO */}
          <View className="pr-3">
            <UserIcon size={35} color="#00CCBB" />
          </View>
        </View>

        {/* SEARCH */}
        <View className="flex gap-[5px] flex-row items-center px-4">
          <View className="flex flex-row bg-gray-200 p-3 w-[90%]">
            <MagnifyingGlassIcon color="gray" size={20} />
            <TextInput
              placeholder="Restaurants and Cuisine"
              keyboardType="default"
            />
          </View>
          <View className=" w-[10%]">
            <AdjustmentsVerticalIcon color="#00CCBB" />
          </View>
        </View>

        {/* BODY */}

        {/* CATEGORIES */}
        <View>
          <Categories />
        </View>
        {/* Featured Rows */}
        {/* FEATURED */}
        <View>
          {featuredCategories?.map((category, index) => {
            return (
              <View key={index}>
                <FeaturedRow
                  id={category._id}
                  title={category.name}
                  description={category.short_description}
                />
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen
