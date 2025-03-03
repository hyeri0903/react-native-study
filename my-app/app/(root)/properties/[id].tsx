import {View, Text} from 'react-native'
import React from 'react'
import { useLocalSearchParams } from "expo-router";

export const Property = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Text>Property {id}</Text>
        </View>
    )
}

