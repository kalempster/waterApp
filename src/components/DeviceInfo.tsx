import React, { FC } from "react";
import { DeviceManager } from "../objects/DeviceManager";
import { Appbar, IconButton, Text } from "react-native-paper";
import { Image, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type DeviceInfoProps = NativeStackScreenProps<RootStackParamList, "DeviceInfo">;


const DeviceInfo: FC<DeviceInfoProps> = ({ navigation, route }) => {

    const insets = useSafeAreaInsets();
    return (
        <>
            <Appbar style={{ height: insets.top + 56, display: "flex", justifyContent: "space-between", alignItems: "center" }} safeAreaInsets={{ top: insets.top }}>
                <IconButton icon={"arrow-left"} style={{ display: "flex" }} onPress={() => navigation.goBack()} />
                <Image source={require("../assets/gradient.png")} style={{ width: "50%", resizeMode: "cover", height: "100%", display: "flex" }} />
                <IconButton icon={"arrow-left"} style={{ display: "flex", opacity: 0 }} />
            </Appbar>
            <View style={styles.container}>
                <Text variant="displayMedium">{route.params.device.name}</Text>
                <Text variant="titleMedium">{route.params.device.number}</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignItems: "center",
        width: "100%"
    }
})

export default DeviceInfo;