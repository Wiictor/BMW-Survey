import { Injectable } from "@angular/core";
import { SurveyFormModel } from "../../survey-form/surveyFormModel";
import { GlobalVariablesService } from "../global/global-variables-service";
import { LocalStorageService } from "angular-2-local-storage";

@Injectable()
export class StorageLocalService {

    constructor(private _globalVariables: GlobalVariablesService, private _localStorageService: LocalStorageService){
    }

    public sendFormToLocalStorage(surveyForm: SurveyFormModel){
        if(surveyForm.Age < 18){
            this.checkIfDatabaseExistAndAddItem(this._globalVariables.LOCAL_STORAGE_NAME_UNDERAGED_DRIVERS, 1);
          }
          if(surveyForm.OwnCarDrivingLicense != 1 && surveyForm.Age > 18){
            this.checkIfDatabaseExistAndAddItem(this._globalVariables.LOCAL_STORAGE_NAME_UNLICENSED_DRIVERS, 1);
          }
          if(surveyForm.isTargetableClient){
            this.checkIfDatabaseExistAndAddItem(this._globalVariables.LOCAL_STORAGE_NAME_TARGETABLE_DRIVERS, 1);
          }
          if(surveyForm.isTargetableClient && surveyForm.DriftingInterest == 1 ){
            this.checkIfDatabaseExistAndAddItem(this._globalVariables.LOCAL_STORAGE_NAME_TARGETABLE_AND_DRIFTING_DRIVERS, 1);
          }
          if(surveyForm.DriveTrainPreferred == "FRW" || surveyForm.DriveTrainPreferred == "IDK"){
            this.checkIfDatabaseExistAndAddItem(this._globalVariables.LOCAL_STORAGE_NAME_DRIVETRAIN_FWD_IDK_DRIVERS, 1);
          }
    }

    checkIfDatabaseExistAndAddItem(databaseName: string, numberOfItemsToAdd: number){
        let database = this._localStorageService.get<string>(databaseName);
        let databaseValue = parseInt(database) || 0;
        databaseValue += numberOfItemsToAdd;
        this._localStorageService.set(databaseName, databaseValue);
    }

    public startDatabaseWithDummyData(){
      let listOfDatabaseNames = new Array<string>();
      listOfDatabaseNames.push(this._globalVariables.LOCAL_STORAGE_NAME_UNDERAGED_DRIVERS);
      listOfDatabaseNames.push(this._globalVariables.LOCAL_STORAGE_NAME_UNLICENSED_DRIVERS);
      listOfDatabaseNames.push(this._globalVariables.LOCAL_STORAGE_NAME_TARGETABLE_DRIVERS);
      listOfDatabaseNames.push(this._globalVariables.LOCAL_STORAGE_NAME_TARGETABLE_AND_DRIFTING_DRIVERS);
      listOfDatabaseNames.push(this._globalVariables.LOCAL_STORAGE_NAME_DRIVETRAIN_FWD_IDK_DRIVERS);
      listOfDatabaseNames.forEach(databaseName => {
        let startValue = Math.floor(Math.random() * 100) + 1;
        this._localStorageService.set(databaseName, startValue);
      });
    }

    public readFromDatabase(databaseName: string): number{
      let database = this._localStorageService.get<string>(databaseName);
      return parseInt(database) || 0;
    }

}