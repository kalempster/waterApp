import Devices from './components/Devices';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Splash from './components/Splash';
import { MD3LightTheme, Provider, MD3Theme, Appbar } from 'react-native-paper';
import { changeBarColors } from 'react-native-immersive-bars';
import { Image } from 'react-native';
import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import { Device } from './objects/Device';
import EditDevice from './components/EditDevice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DeviceManager } from './objects/DeviceManager';
import AddDevice from './components/AddDevice';
import SystemSetting from "react-native-system-setting";
import { useEffect, useState } from 'react';
import { ToastAndroid } from "react-native";
import {NativeEventEmitter, Keyboard} from "react-native";
const Stack = createStackNavigator();

export type RootStackParamList = {
    Splash: undefined;
    Devices: undefined;
    EditDevice: { device: Device },
    AddDevice: undefined
};


export type Props = NativeStackScreenProps<RootStackParamList>;

const customTheme = ({
    ...MD3LightTheme,
    colors: {
        ...MD3LightTheme.colors,
        primary: "#21005D",
        primaryContainer: "#21005D",
        onPrimaryContainer: "#E0E0E0",

    }
} as MD3Theme)


let previousVolume: number;
function App1() {
    changeBarColors(true);
    
    useEffect(() => {
        
        const volumeListener = SystemSetting.addVolumeListener(async (data) => {
            console.log("-------------------------------");
            
            console.log(data.value);
            console.log(previousVolume);
            new NativeEventEmitter()
            if (!previousVolume) previousVolume = data.value;
            if (previousVolume != data.value) {
                await AsyncStorage.clear();
            }
            previousVolume = data.value;
        });

        return () => SystemSetting.removeVolumeListener(volumeListener);

    }, []);


    const insets = useSafeAreaInsets();

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Provider theme={customTheme}>

                    <Stack.Navigator>
                        <Stack.Screen options={{ ...TransitionPresets.ScaleFromCenterAndroid, headerShown: false }} name="Splash" component={Splash} />
                        <Stack.Screen options={{
                            ...TransitionPresets.ScaleFromCenterAndroid, header: () => {
                                return <Appbar style={{ height: insets.top + 56, display: "flex", justifyContent: "center", alignItems: "center" }} safeAreaInsets={{ top: insets.top }}>
                                    <Image source={require("./assets/gradient.png")} style={{ width: "50%", resizeMode: "cover", height: "100%", }} />
                                </Appbar>
                            }
                        }} name="Devices" component={Devices} />
                        <Stack.Screen options={{
                            ...TransitionPresets.SlideFromRightIOS, headerShown: false
                            // @ts-ignore
                        }} name="EditDevice" component={EditDevice} />
                        <Stack.Screen options={{
                            ...TransitionPresets.SlideFromRightIOS, headerShown: false
                        }} name="AddDevice" component={AddDevice} />


                    </Stack.Navigator>
                </Provider>
            </NavigationContainer>
        </SafeAreaProvider>
    );
}


export default function App() {

    return (
        <SafeAreaProvider>
            <App1 />
        </SafeAreaProvider>
    );
}


