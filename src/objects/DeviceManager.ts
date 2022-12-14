import { Device } from "./Device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isEqual } from "lodash";
import { deviceEmitter } from "./DeviceEmitter";
import { EventEmitter } from "react-native";
export const DEVICES_KEY_NAME = "devices";


export class DeviceManager {

    static async addDevice(device: Device): Promise<boolean> {
        const devices = await AsyncStorage.getItem(DEVICES_KEY_NAME);
        if (!devices) {
            await AsyncStorage.setItem(DEVICES_KEY_NAME, JSON.stringify([device]));
            deviceEmitter.emit("deviceAdd", device);
            return true;
        }

        const newDevices = (JSON.parse((devices as string)) as Device[]);
        if (await this.deviceExists(device)) return false;
        newDevices.push(device);
        await AsyncStorage.setItem(DEVICES_KEY_NAME, JSON.stringify(newDevices));
        deviceEmitter.emit("deviceAdd", device);
        return true;
    }

    static async getDevices() {
        const devices = await AsyncStorage.getItem(DEVICES_KEY_NAME);
        if (!devices) {
            await AsyncStorage.setItem(DEVICES_KEY_NAME, "[]");
            return [];
        }

        return (JSON.parse(devices) as Device[]);
    }


    static async updateDevice(previousDevice: Device, device: Device) {

        if (!await this.deviceExists(previousDevice)) {
            // await this.addDevice(device); Dont use any function from this class in itself since the double checks 
            await AsyncStorage.setItem(DEVICES_KEY_NAME, JSON.stringify([...JSON.parse(await AsyncStorage.getItem(DEVICES_KEY_NAME) as string), device]));
            deviceEmitter.emit("deviceEdit", device);
            return;
        }

        const deviceArray = await this.getDevices();
        for (let index = 0; index < deviceArray.length; index++) {
            if (isEqual(deviceArray[index], previousDevice)) {
                deviceArray[index] = device;
                await this.setDevices(deviceArray);
                deviceEmitter.emit("deviceEdit", device);
                break;
            }
        }
    }


    static async deleteDevice(device: Device) {
        const devices = await AsyncStorage.getItem(DEVICES_KEY_NAME);
        if (!devices) {
            await AsyncStorage.setItem(DEVICES_KEY_NAME, "[]");
            deviceEmitter.emit("deviceRemove", device);
            return;
        }

        let deviceArray = (JSON.parse(devices) as Device[]);
        deviceArray = deviceArray.filter((d) => !isEqual(d, device));
        await this.setDevices(deviceArray);
        deviceEmitter.emit("deviceRemove", device);
    }



    static async deviceExists(device: Device) {
        const devices = await AsyncStorage.getItem(DEVICES_KEY_NAME);
        if (!devices) {
            await AsyncStorage.setItem(DEVICES_KEY_NAME, "[]");
            return false;
        }

        const deviceArray = (JSON.parse(devices) as Device[]);
        return deviceArray.find((d) => isEqual(d, device)) ? true : false;
    }

    private static async setDevices(deviceArray: Device[]) {
        await AsyncStorage.setItem(DEVICES_KEY_NAME, JSON.stringify(deviceArray));
    }

    static async flushDevices() {
        await AsyncStorage.removeItem(DEVICES_KEY_NAME);
        deviceEmitter.emit("devicesFlush");
    }

}