import {ActivityIndicator, SafeAreaView} from "react-native";
import {useGlobalContext} from "@/lib/global-provider";
import {Redirect, Slot} from "expo-router";

export default function AppLayout() {
    const { loading, isLoggedIn } = useGlobalContext();

    if (loading) {
        return (
            <SafeAreaView className={"bg-white h-full flex justify-center items-center"}>
                <ActivityIndicator className={"text-primary-300"}>

                </ActivityIndicator>
            </SafeAreaView>
        )
    }

    if(!isLoggedIn) {
        return <Redirect href="/sign-in" />;
    }
    return <Slot />
}