export class RadioButtonItem {
    public value: number;
    public name : string;
    public selected: boolean;
   
    constructor(value: number, name: string, selected: boolean) {
        this.value = value;
        this.name = name;
        this.selected = selected;
    }
   }