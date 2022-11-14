import { EmitterSubscription, EventEmitter, NativeEventEmitter } from "react-native";
import { Device } from "./Device";



export class DeviceEmitter extends NativeEventEmitter {

    addListener(eventType: "deviceAdd", listener: (device: Device) => any, context?: any): EmitterSubscription;
    addListener(eventType: "deviceRemove", listener: (device: Device) => any, context?: any): EmitterSubscription;
    addListener(eventType: "deviceEdit", listener: (device: Device) => any, context?: any): EmitterSubscription;
    addListener(eventType: string, listener: (...args: any[]) => any, context?: any) {
        return super.addListener(eventType, listener, context);
    };
    emit(eventType: "deviceAdd", device: Device): void;
    emit(eventType: "deviceRemove", device: Device): void;
    emit(eventType: "deviceEdit", device: Device): void;
    emit(eventType: string, ...params: any[]): void {
        super.emit(eventType, ...params)
    }
    removeAllListeners(eventType: "deviceAdd"): void;
    removeAllListeners(eventType: "deviceRemove"): void;
    removeAllListeners(eventType: "deviceEdit"): void;
    removeAllListeners(eventType: string): void {
        super.removeAllListeners(eventType);
    }
    listenerCount(eventType: "deviceAdd"): number;
    listenerCount(eventType: "deviceRemove"): number;
    listenerCount(eventType: "deviceEdit"): number;
    listenerCount(eventType: string): number {
        return super.listenerCount(eventType);
    }


}

export const deviceEmitter = new DeviceEmitter();