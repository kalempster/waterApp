
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { List, IconButton, FAB, Dialog, Button, TextInput, Portal, Text, Divider } from "react-native-paper";
import { RootStackParamList } from "../App";
import { useKeyboard } from "../hooks/useKeyboard";
import { Device } from "../objects/Device";
import { DeviceManager } from "../objects/DeviceManager";

type Props = NativeStackScreenProps<RootStackParamList>;


const Devices : FC<Props> = ({navigation, route}) => {

    const keyboardHeight = useKeyboard();
    const [devices, setDevices] = useState<Device[]>([]);
    

    useEffect(() => {
        const willFocusSubscription = navigation.addListener('focus', async() => {
            console.log(await DeviceManager.getDevices());
            setDevices(await DeviceManager.getDevices());
        });
        return willFocusSubscription;
    }, []);

    const handleElementPressed = (deviceObject: Device) => {
        console.log(deviceObject.name);

    }
    const ref = useRef<View>(null);


    return (
        <View style={{ paddingBottom: keyboardHeight, height: "100%" }}>

            <View ref={ref} style={styles.parent}>
                <List.Section style={{ width: "100%"}} >
                    {devices.map((d, index) => {
                        return <View key={index + "kj"}>
                            <List.Item
                                onPress={() => handleElementPressed(d)}
                                title={d.name}
                                description={d.number}
                                left={props => <List.Icon {...props} icon="sim" />}
                                right={props => <IconButton {...props} icon={"cog"} onPress={() => {
                                    navigation.navigate("EditDevice", {device: d})
                                }} />}
                                key={index + "a"}
                            />
                            <Divider bold key={index + "D"} />
                        </View>
                    })}
                </List.Section>
                <FAB icon={"plus"} style={styles.fab} />

            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    parent: {
        width: "100%",
        height: "100%",
        display: "flex",
        position: "absolute"
    },
    title: {
        fontSize: 64,
        color: "black"
    },
    fab: {
        position: 'absolute',
        margin: 32,
        right: 0,
        bottom: 0,
    },

})

export default Devices;