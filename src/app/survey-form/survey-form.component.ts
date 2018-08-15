import { Component, OnInit, ViewChild, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';
import { Gender } from '../shared/genderInterface';
import { CustomValidators } from 'ng2-validation';
import { SurveyFormModel } from './surveyFormModel';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
  providers: [FormBuilder]
})
export class SurveyFormComponent implements OnInit, OnChanges {
  @ViewChild('stepper') stepper: MatStepper;

  isLinear = true;
  goToLastOne = false;
  sendForm = false;
  testInProgress = true;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  surveyForm: SurveyFormModel;

  lastStepNumber = 4;

  finishText = "";
  
  genders: Gender[] = [
    {value: 'M', viewValue: 'Male'},
    {value: 'F', viewValue: 'Female'},
    {value: 'O', viewValue: 'Other'}
  ];

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.surveyForm = new SurveyFormModel();

    this.firstFormGroup = this._formBuilder.group({
      ageCtrl: ['', [Validators.required, Validators.pattern("^[0-9][0-9]?$|^100$")] ],
      genderCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
  }

  ngOnChanges(changes: SimpleChanges){
    const name: SimpleChange = changes.name;
    console.log(name);
  }

  onAgeChange(event: number){
    this.surveyForm.Age = event;
  }

  onGenderChange(event: string){
    this.surveyForm.Gender = event;
  }

  nextStep(index: number){
    debugger;
    
    switch(index) { 
      case 1: { 
         if(this.surveyForm.Age < 18)
         {
          this.goToLastOne = true;
          this.sendForm = true;
          this.finishText = "Thanks for your interest in helping BMW. You have finished the test."
         }
         break; 
      } 
      case 2: { 
         //statements; 
         break; 
      } 
      case 3: { 
        //statements; 
        break; 
      } 
      default: { 
         //statements; 
         this.finishText = "Thanks for completing the form, your opinion is highly appreciated. Have a good day!";
         this.sendForm = true;
         break; 
      } 
   }

    if(this.goToLastOne){
      this.isLinear = false;
      this.surveyForm.isTargetableClient = false;
      index = this.lastStepNumber;
    }

    if(this.sendForm){
      this.submitForm();
    }
    else{
      this.goToStepIndex(index);
    }
    
  }

  submitForm(){
    this.testInProgress = false;
    console.log("Form has been submitted");
  }

  goToStepIndex(index: number){
    this.stepper.selectedIndex = index;
  }

}