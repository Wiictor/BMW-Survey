import { Component, OnInit, ViewChild, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray } from '@angular/forms';
import { MatStepper, MatRadioChange } from '@angular/material';
import { SurveyFormModel, DatabaseStructure } from './surveyFormModel';
import { SelectOption } from '../shared/selectOptionInterface';
import { StorageLocalService } from '../shared/local-storage/storagelocal.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
  providers: [FormBuilder, StorageLocalService]
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
  fifthFormGroup: FormGroup;

  surveyForm: SurveyFormModel;

  lastStepNumber = 4;

  finishText = "";
  carList = Array<string>();
  
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

  selectedDriveTrain = this.driveTrainOptions[0];

  constructor(private _formBuilder: FormBuilder, 
    private _storageLocalService: StorageLocalService) {}

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
    });
    this.fifthFormGroup = this._formBuilder.group({
      bmwDrivenCars: this._formBuilder.array([])
    })
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

  onBmwModelChange(event: string, index: number){
    this.carList[index] = event;
    console.log(this.carList);
  }

  addBmwCarsOptions() {
   console.log(this.surveyForm.BmwDrivenNumber);
   let formArr = this.fifthFormGroup.controls.bmwDrivenCars as FormArray;
   for(let i = 1; i <= this.surveyForm.BmwDrivenNumber; i++) {
      formArr.push(this._formBuilder.group({
        displayName: ['Model of driven BMW ' + i],
        value: [''],
        bmwCarValidator: ['', Validators.required]
      }))
      this.carList.push('');
    }
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
      case 4: {
        //statements;
        if(this.surveyForm.BmwDrivenNumber > 0){
          this.addBmwCarsOptions();
          this.stepper.linear = false;
        }
        if(this.surveyForm.BmwDrivenNumber == 0 && this.surveyForm.DriveTrainPreferred != ""){
          this.finishCurrentTest("Thanks for completing the form, your opinion is highly appreciated. Have a good day!", index);
        }
        break;
      }
      default: {
        if(this.carList.indexOf("") == -1 ) {
          this.surveyForm.BmwDrivenList = this.carList;
          this.finishCurrentTest("Thanks for completing the form, your opinion is highly appreciated. Have a good day!", index);
        }
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
    this._storageLocalService.sendFormToLocalStorage(this.surveyForm);
    console.log("Form has been submitted");
  }

  goToStepIndex(index: number){
    this.stepper.selectedIndex = index;
    if(index == 2 && !this.displayBonusQuestion){
      this.stepper.selectedIndex = index + 1;
    }
  }
}