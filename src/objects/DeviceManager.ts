import { Device } from "./Device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {isEqual} from "lodash";
export const DEVICES_KEY_NAME = "devices";

export class DeviceManager {

    static async addDevice(device: Device): Promise<boolean> {
        const devices = await AsyncStorage.getItem(DEVICES_KEY_NAME);
        if (!devices) {
            await AsyncStorage.setItem(DEVICES_KEY_NAME, JSON.stringify([device]));
            return true;
        }
        const newDevices = (JSON.parse((devices as string)) as Device[]);
        if (await this.deviceExists(device)) return false;
        newDevices.push(device);
        await AsyncStorage.setItem(DEVICES_KEY_NAME, JSON.stringify(newDevices));
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
            return;
        }
        const deviceArray = await this.getDevices();
        for (let index = 0; index < deviceArray.length; index++) {
            if (isEqual(deviceArray[index], previousDevice)) {
                deviceArray[index] = device;
                await this.setDevices(deviceArray);
                break;
            }
        }
    }


    static async deleteDevice(device: Device) {
        const devices = await AsyncStorage.getItem(DEVICES_KEY_NAME);
        if (!devices) {
            await AsyncStorage.setItem(DEVICES_KEY_NAME, "[]");
            return;
        }
        const deviceArray = (JSON.parse(devices) as Device[]);
        deviceArray.filter((d) => d.name != device.name && d.number != device.number);
    }



    static async deviceExists(device: Device) {
        const devices = await AsyncStorage.getItem(DEVICES_KEY_NAME);
        if (!devices) {
            await AsyncStorage.setItem(DEVICES_KEY_NAME, "[]");
            return false;
        }
        const deviceArray = (JSON.parse(devices) as Device[]);
        return deviceArray.find((d) => d.name == device.name && d.number == device.number) ? true : false;
    }

    private static async setDevices(deviceArray: Device[]) {
        await AsyncStorage.setItem(DEVICES_KEY_NAME, JSON.stringify(deviceArray));
    }

}