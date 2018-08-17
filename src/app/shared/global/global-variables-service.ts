import { Injectable } from "@angular/core";

@Injectable()
export class GlobalVariablesService {
    public LOCAL_STORAGE_PREFIX_FOR_DRIVERS: string = "-drivers";

    public LOCAL_STORAGE_NAME_UNDERAGED_DRIVERS: string = "underaged" + this.LOCAL_STORAGE_PREFIX_FOR_DRIVERS;
    public LOCAL_STORAGE_NAME_UNLICENSED_DRIVERS: string = "unlicensed" + this.LOCAL_STORAGE_PREFIX_FOR_DRIVERS;
    public LOCAL_STORAGE_NAME_TARGETABLE_DRIVERS: string = "targetable" + this.LOCAL_STORAGE_PREFIX_FOR_DRIVERS;
    public LOCAL_STORAGE_NAME_TARGETABLE_AND_DRIFTING_DRIVERS: string = "targetable-drifting" + this.LOCAL_STORAGE_PREFIX_FOR_DRIVERS;
    public LOCAL_STORAGE_NAME_DRIVETRAIN_FWD_IDK_DRIVERS: string = "drivetrain-fwd-idk" + this.LOCAL_STORAGE_PREFIX_FOR_DRIVERS;

}