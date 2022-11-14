
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Dimensions, Vibration } from "react-native";
import { List, IconButton, FAB, Dialog, Button, TextInput, Portal, Text, Divider, ActivityIndicator, Menu } from "react-native-paper";
import { RootStackParamList } from "../App";
import { useKeyboard } from "../hooks/useKeyboard";
import { Device } from "../objects/Device";
import { DeviceManager } from "../objects/DeviceManager";
import { deviceEmitter } from "../objects/Emitter";

type Props = NativeStackScreenProps<RootStackParamList>;


const Devices: FC<Props> = ({ navigation, route }) => {

    const keyboardHeight = useKeyboard();
    const [devices, setDevices] = useState<Device[]>([]);

    useEffect(() => {
        const deviceAddSub = deviceEmitter.addListener("deviceAdd", async () => {
            console.log(await DeviceManager.getDevices());
            setDevices(await DeviceManager.getDevices());
        });

        const deviceEditSub = deviceEmitter.addListener("deviceEdit", async () => {
            console.log(await DeviceManager.getDevices());
            setDevices(await DeviceManager.getDevices());
        });

        const deviceDeleteSub = deviceEmitter.addListener("deviceRemove", async () => {
            console.log(await DeviceManager.getDevices());
            setDevices(await DeviceManager.getDevices());
        });


        return () => {
            deviceAddSub.remove();
            deviceEditSub.remove();
            deviceDeleteSub.remove();
        };
    }, []);

    const handleElementPressed = (deviceObject: Device) => {
        console.log(deviceObject.name);

    }
    const ref = useRef<View>(null);


    return (
        <View style={{ paddingBottom: keyboardHeight, height: "100%" }}>

            <View ref={ref} style={styles.parent}>
                <List.Section style={{ width: "100%" }} >
                    {listDevices(devices, handleElementPressed, navigation)}
                </List.Section>
                <FAB icon={"plus"} style={styles.fab} onPress={() => navigation.navigate("AddDevice")} />

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
        position: "absolute",
        margin: 32,
        right: 0,
        bottom: 0,
    },

})

export default Devices;

function listDevices(devices: Device[], handleElementPressed: (deviceObject: Device) => void, navigation: NativeStackNavigationProp<RootStackParamList>) {
    const [anchorX, setAnchorX] = useState(0);
    const [anchorY, setAnchorY] = useState(0);
    const [deleteMenu, setDeleteMenu] = useState(false);
    const [currentDevice, setCurrentDevice] = useState<Device>();
    return <>
        <Menu
            onDismiss={() => setDeleteMenu(false)}
            visible={deleteMenu}
            anchor={{ x: anchorX, y: anchorY }}>
            <Menu.Item onPress={() => {
                DeviceManager.deleteDevice((currentDevice as Device));
                setDeleteMenu(false);
            }} title="Delete" />
        </Menu>
        {
            devices.map((d, index) => {
                return <View key={index + "kj"}>

                    <List.Item
                        descriptionNumberOfLines={1}
                        onPress={() => handleElementPressed(d)}
                        title={d.name}
                        description={d.number}
                        left={props => <List.Icon {...{ ...props, style: { alignSelf: "center", "marginLeft": 16, "marginRight": 0 } }} icon="sim" />}
                        right={props => <IconButton {...props} icon={"cog"} onPress={() => {
                            navigation.navigate("EditDevice", { device: d });
                        }} />}
                        onLongPress={(e) => {
                            setAnchorX(e.nativeEvent.pageX);
                            setAnchorY(e.nativeEvent.pageY);
                            setCurrentDevice(d);
                            setDeleteMenu(true);
                            Vibration.vibrate(50);
                        }}
                        key={index + "a"} />
                    <Divider bold key={index + "D"} />
                </View >;
            })
        }
    </>;
}
