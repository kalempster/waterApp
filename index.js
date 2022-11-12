/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { DeviceManager } from "./src/objects/DeviceManager";
import { Device } from './src/objects/Device';
import AsyncStorage from "@react-native-async-storage/async-storage";

// (async () => {
//     console.log("xd");
    
//     await AsyncStorage.clear();
//     await DeviceManager.addDevice(new Device("device 1", "123"));
//     await DeviceManager.addDevice(new Device("device 2", "333"));
    AppRegistry.registerComponent(appName, () => App);

// })();

