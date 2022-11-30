import { InputType } from "../enums/InputType";

export class Input {
    name: string = "";
    isArmed: boolean = true;
    inputType: InputType = InputType.NORMAL;
    smsText: string = "";
    normalyClosed: boolean = false;


    constructor(name?: string, isArmed?: boolean, inputType?: InputType, smsText?: string, normalyClosed?: boolean) {
        if (name) this.name = name;
        if (isArmed) this.isArmed = this.isArmed;
        if (inputType) this.inputType = inputType;
        if(smsText) this.smsText = smsText;
        if(normalyClosed) this.normalyClosed = normalyClosed;
    }

}