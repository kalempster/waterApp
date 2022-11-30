
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { FC, useEffect, useRef, useState } from "react";
import { View, StyleSheet, Vibration, ScrollView } from "react-native";
import { List, IconButton, FAB, Divider, Menu } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootStackParamList } from "../App";
import { useKeyboard } from "../hooks/useKeyboard";
import { Device } from "../objects/Device";
import { DeviceManager } from "../objects/DeviceManager";
import { deviceEmitter } from "../objects/DeviceEmitter";

type Props = NativeStackScreenProps<RootStackParamList>;


const Devices: FC<Props> = ({ navigation, route }) => {

    const keyboardHeight = useKeyboard();
    const [devices, setDevices] = useState<Device[]>([]);

    const insets = useSafeAreaInsets();

    useEffect(() => {
        (async () => {
            console.log(await DeviceManager.getDevices());
            setDevices(await DeviceManager.getDevices());
        })();

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


        const deviceFlushSub = deviceEmitter.addListener("devicesFlush", async () => {
            console.log(await DeviceManager.getDevices());
            setDevices(await DeviceManager.getDevices());
        });


        return () => {
            deviceAddSub.remove();
            deviceEditSub.remove();
            deviceDeleteSub.remove();
            deviceFlushSub.remove();
        };
    }, []);


    const ref = useRef<View>(null);


    return (
        <View style={{ paddingBottom: keyboardHeight, height: "100%" }}>

            <View ref={ref} style={styles.parent}>
                <ScrollView>
                    <List.Section style={{ width: "100%" }} >
                        {listDevices(devices,  navigation)}
                    </List.Section>
                </ScrollView>
                <FAB icon={"plus"} style={{ ...styles.fab, bottom: insets.bottom, right: insets.right }} onPress={() => navigation.navigate("AddDevice")} />

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
        margin: 16,
        right: 0,
        bottom: 0,
    },

});

export default Devices;

function listDevices(devices: Device[], navigation: NativeStackNavigationProp<RootStackParamList>) {
    const [anchorX, setAnchorX] = useState(0);
    const [anchorY, setAnchorY] = useState(0);
    const [deleteMenu, setDeleteMenu] = useState(false);
    const [currentDevice, setCurrentDevice] = useState<Device>();
    return <>
        <Menu
            style={{
                width: 196
            }}
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
                        onPress={() => navigation.navigate("DeviceInfo", {device: d})}
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
