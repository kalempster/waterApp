import { useState } from "react";
import { Image, KeyboardAvoidingView } from "react-native";
import { Menu, TextInput } from "react-native-paper";
import { Props } from "../App";
import { Appbar, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Device } from "../objects/Device";
import { DeviceManager } from "../objects/DeviceManager";
//@ts-ignore


const AddDevice = ({ navigation, route }: Props) => {

    const insets = useSafeAreaInsets();

    const [deviceName, setDeviceName] = useState("");
    const [deviceNumber, setDeviceNumber] = useState("");
    return (
        <>
            <Appbar style={{ height: insets.top + 56, display: "flex", justifyContent: "space-between", alignItems: "center" }} safeAreaInsets={{ top: insets.top }}>
                <IconButton icon={"arrow-left"} style={{ display: "flex" }} onPress={() => navigation.goBack()} />
                <Image source={require("../assets/gradient.png")} style={{ width: "50%", resizeMode: "cover", height: "100%", display: "flex" }} />
                <IconButton icon={"content-save"} style={{ display: "flex" }} onPress={async () => {
                    console.log(await DeviceManager.getDevices());
                    await DeviceManager.addDevice(new Device(deviceName, deviceNumber));
                    console.log(await DeviceManager.getDevices());
                    navigation.goBack();
                }} />
            </Appbar>
            <KeyboardAvoidingView style={{
                paddingHorizontal: 10,
                paddingVertical: 20,
                display: "flex",
            }}>
                <TextInput mode="outlined" label={"Name"} value={deviceName} onChangeText={(t) => setDeviceName(t)} style={{ backgroundColor: "#EFEFEF", marginVertical: 10 }} />
                <TextInput mode="outlined" label={"Number"} value={deviceNumber} onChangeText={(t) => setDeviceNumber(t)} style={{ backgroundColor: "#EFEFEF", marginVertical: 10 }} />
            </KeyboardAvoidingView>
        </>
    )
}


export default AddDevice;
