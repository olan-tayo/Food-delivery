import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowLongRightIcon } from 'react-native-heroicons/outline'
import RestaurantCards from './RestaurantCards'
import sanityClient from '../sanity'

const FeaturedRow = ({ title, description, id }) => {
  const [restaurants, setRestaurants] = useState([])
  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "featured" &&  _id == $id] {
        ...,
         restaurant[] -> {
           ...,
           dishes[] -> {
             ...,
           }
         } 
       }[0]
      `,
        { id },
      )
      .then((data) => {
        setRestaurants(data?.restaurant)
      })
  }, [])

  console.log(restaurants)

  return (
    <View>
      <View className="mt-4 flex flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowLongRightIcon color="#00CCBB" />
      </View>
      <Text className="text-sm text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* RESTAURANT CARDS */}

        {restaurants.map((data, index) => {
          return (
            <RestaurantCards
              key={index}
              id={data._id}
              imgUrl={data.image}
              title={data.name}
              rating={data.rating}
              genre="Nigerian"
              address={data.address}
              short_description={data.short_description}
              dishes={data.dishes}
              long={data.long}
              lat={data.lat}
            />
          )
        })}
      </ScrollView>
    </View>
  )
}

export default FeaturedRow
