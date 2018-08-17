import { Component, OnInit } from '@angular/core';
import { StorageLocalService } from '../shared/local-storage/storagelocal.service';
import { GlobalVariablesService } from '../shared/global/global-variables-service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  underagedDrivers: number;
  unlicensedDrivers: number;
  targetableDrivers: number;
  targetableDriftingDrivers: number;
  drivetrainFwdIdkDrivers: number;

  constructor(private _storageLocalService: StorageLocalService, private _globalVariablesService: GlobalVariablesService) { }

  ngOnInit() {
    this.underagedDrivers = this._storageLocalService.readFromDatabase(this._globalVariablesService.LOCAL_STORAGE_NAME_UNDERAGED_DRIVERS);
    this.unlicensedDrivers = this._storageLocalService.readFromDatabase(this._globalVariablesService.LOCAL_STORAGE_NAME_UNLICENSED_DRIVERS);
    this.targetableDrivers = this._storageLocalService.readFromDatabase(this._globalVariablesService.LOCAL_STORAGE_NAME_TARGETABLE_DRIVERS);
    this.targetableDriftingDrivers = this._storageLocalService.readFromDatabase(this._globalVariablesService.LOCAL_STORAGE_NAME_TARGETABLE_AND_DRIFTING_DRIVERS);
    this.drivetrainFwdIdkDrivers = this._storageLocalService.readFromDatabase(this._globalVariablesService.LOCAL_STORAGE_NAME_DRIVETRAIN_FWD_IDK_DRIVERS);
  }

}
