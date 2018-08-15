import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import { RadioButtonItem } from "./radiobuttonitem";
import { MatRadioChange } from "@angular/material";

@Component({
 selector: 'radio-button',
 templateUrl: 'radiobutton.component.html?v=' + Math.random()
})

export class RadioButtonComponent implements OnInit {
 @Input() public radiobuttonList: RadioButtonItem[];
 @Input() public required: boolean;
 
 @Output() public changedItemEvent = new EventEmitter();
 private selected: string;

 ngOnInit(){
  this.radiobuttonList.forEach( radioButton => {
    if(radioButton.selected){
     this.selected = radioButton.name;
     this.changedItemEvent.emit(radioButton.value);
    }
  });
 }

 private changeValue(event: MatRadioChange) {
  this.changedItemEvent.emit(event.value);
 }
}