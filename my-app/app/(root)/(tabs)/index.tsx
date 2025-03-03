import {FlatList, Image, SafeAreaView, Text, TouchableOpacity, View, Button} from "react-native";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";
import {useGlobalContext} from "@/lib/global-provider";
import seed from "@/lib/seed";
import {router, useLocalSearchParams} from "expo-router";
import {useAppwrite} from "@/lib/useAppwrite";
import {getLatestProperties, getProperties} from "@/lib/appwrite";
import {param} from "ts-interface-checker";
import {useEffect} from "react";

export default function Index() {
    const { user } = useGlobalContext();

    const params = useLocalSearchParams<{ query?: string; filter?: string }>();

    const { data: latestProperties, loading: latestPropertiesLoading } =
        useAppwrite({
            fn: getLatestProperties,
        });

    const {
        data: properties,
        refetch,
        loading,
    } = useAppwrite({
        fn: getProperties,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        },
        skip: true,
    });

    useEffect(() => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 6,
        });
    }, [params.filter, params.query]);

    const handleCardPress = (id: string) => router.push(`/properties/${id}`);

    return (
        <SafeAreaView className={"bg-white h-full"}>
            {/*<Button title="Seed" onPress={seed} />*/}
            <FlatList
                data={properties}
                renderItem={({item}) => (
                    <Card item={item} onPress={() => handleCardPress(item.$id)}/>
                )}
                keyExtractor={(item => item.toString())}
                numColumns={2}
                contentContainerClassName={"pb-32"}
                columnWrapperClassName={"flex gap-5 px-5"}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View className={"px-5"}>
                        <View className={"flex flex-row items-center justify-between mt-5"}>
                            <View className={"flex flex-row items-center"}>
                                <Image source={{uri: user?.avatar}} className={"size-12 rounded-full"}></Image>
                                <View className={"flex flex-col items-start ml-2 justify-center"}>
                                    <Text className={"text-xs font-rubik text-black-100"}>Good Morning</Text>
                                    <Text className={"text-base font-rubik-medium text-black-300"}>
                                        {user?.name}
                                    </Text>
                                </View>
                            </View>
                            <Image source={icons.bell} className={"size-6"}/>
                        </View>

                        <Search/>

                        <View className={"my-5"}>
                            <View className={"flex flex-row items-center justify-between"}>
                                <Text className={"text-xl font-rubik-bold text-black-300"}>
                                    Featured
                                </Text>
                                <TouchableOpacity>
                                    <Text className={"text-base font-rubik-bold text-primary-300"}>
                                        See All
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <FlatList
                                data={latestProperties}
                                renderItem={({item}) => <FeaturedCard item={item} onPress={() => handleCardPress(item.$id)}/>}
                                keyExtractor={(item) => item.toString()}
                                horizontal
                                bounces={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerClassName={"flex gap-5 mt-5"}
                            />

                            <View className={"flex flex-row items-center justify-between mt-3"}>
                                <Text className={"text-xl font-rubik-bold text-black-300"}>
                                    Our Recommendations
                                </Text>
                                <TouchableOpacity>
                                    <Text className={"text-base font-rubik-bold text-primary-300"}>
                                        See All
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Filters/>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
