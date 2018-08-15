import { Component, OnInit, ViewChild, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatStepper, MatRadioChange } from '@angular/material';
import { SurveyFormModel } from './surveyFormModel';
import { SelectOption } from '../shared/selectOptionInterface';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
  providers: [FormBuilder]
})
export class SurveyFormComponent implements OnInit, OnChanges {
  @ViewChild('stepper') stepper: MatStepper;

  isLinear = true;
  sendForm = false;
  testInProgress = true;
  displayBonusQuestion = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  surveyForm: SurveyFormModel;

  lastStepNumber = 4;

  finishText = "";
  
  genders: SelectOption[] = [
    {value: 'M', viewValue: 'Male', selected: false},
    {value: 'F', viewValue: 'Female', selected: false },
    {value: 'O', viewValue: 'Other', selected: false }
  ];
 
  carDrivingLicenseOptions: SelectOption[] = [
    {value: '1', viewValue: 'Yes', selected: true },
    {value: '0', viewValue: 'No, I prefer using other transport', selected: false}
  ];

  firstCarOptions: SelectOption[] = [
    {value: '1', viewValue: 'Yes', selected: true },
    {value: '0', viewValue: 'No', selected: false}
  ];

  driveTrainOptions: SelectOption[] = [
    {value: 'FRW', viewValue: 'FRW', selected: true },
    {value: 'RWD', viewValue: 'RWD', selected: false},
    {value: 'IDK', viewValue: 'I don\'t know', selected: false}
  ]; 

  driftingOptions: SelectOption[] = [
    {value: '1', viewValue: 'Yes', selected: true },
    {value: '0', viewValue: 'No', selected: false}
  ]; 



  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
    this.surveyForm = new SurveyFormModel();

    this.firstFormGroup = this._formBuilder.group({
      ageCtrl: ['', [Validators.required, Validators.pattern("^[0-9][0-9]?$|^100$")] ],
      genderCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
    });
    this.thirdFormGroup = this._formBuilder.group({
    });
    this.fourthFormGroup = this._formBuilder.group({
      drivetrainCtrl: ['', Validators.required],
      bmwDrivenNumberCtrl: ['', [Validators.required, Validators.pattern("^[0-9][0-9]*$")] ],
      bmwDrivenModelCtrl: ['', Validators.required]
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
  
  onChangeDrivingLicenseOption(event: string) {
    this.surveyForm.OwnCarDrivingLicense = parseInt(event);
  }

  onChangeFirstCarOption(event: string){
    this.surveyForm.FirstCar = parseInt(event);
  }

  onDriveTrainChange(event: string){
    this.surveyForm.DriveTrainPreferred = event;
  }

  onChangeDriftingOption(event: string){
    this.surveyForm.DriftingInterest = parseInt(event);
  }
  onBmwDrivenChange(event: number){
    this.surveyForm.BmwDrivenNumber = event;
    this.fourthFormGroup.addControl("test", new FormControl('', [Validators.required, Validators.pattern("")]));
  }
  onBmwModelChange(event: string){
    console.log(event);
  }

  nextStep(index: number){
    switch(index) { 
      case 1: { 
         if(this.surveyForm.Age < 18 && this.surveyForm.Gender != "") 
         {
          this.finishCurrentTest("Thanks for your interest in helping BMW. You have finished the test.", index);
         }
         if(this.surveyForm.Age >= 18 && this.surveyForm.Age <= 25) {
          this.displayBonusQuestion = true;
         }
         break; 
      } 
      case 2: { 
         //statements; 
         if(this.surveyForm.OwnCarDrivingLicense != 1)
          this.finishCurrentTest("Thanks for your interest in helping BMW. You have finished the test.", index);
         break; 
      } 
      case 3: { 
        //statements; 
        if(this.displayBonusQuestion && this.surveyForm.FirstCar == 1)
          this.finishCurrentTest("We are targeting more experienced clients, thank you for your interest", index);
        break; 
      } 
      default: { 
         //statements;
         if(this.surveyForm.DriveTrainPreferred != "")
          this.finishCurrentTest("Thanks for completing the form, your opinion is highly appreciated. Have a good day!", index);
         break; 
      } 
    }

    if(this.sendForm){
      this.submitForm();
    }
    else{
      this.goToStepIndex(index);
    }
    
  }
  
  finishCurrentTest(finishText: string, index: number){
    if(index < 4){
      this.isLinear = false;
      this.surveyForm.isTargetableClient = false;
    }
    this.sendForm = true;
    this.finishText = finishText;
  }

  submitForm(){
    this.testInProgress = false;
    console.log("Form has been submitted");
  }

  goToStepIndex(index: number){
    this.stepper.selectedIndex = index;
    if(index == 2 && !this.displayBonusQuestion){
      this.stepper.selectedIndex = index + 1;
    }
  }

}