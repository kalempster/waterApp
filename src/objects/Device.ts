import { DeviceType } from "../enums/DeviceType";

export class Device {
    name: string = "";
    number: string = "";
    deviceType: DeviceType = DeviceType.ONE_INPUT;


    constructor(name?: string, number?: string, deviceType?: DeviceType) {
        if (name) this.name = name;
        if (number) this.number = number;
        if (deviceType) this.deviceType = deviceType;
    }





}