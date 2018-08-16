export class SurveyFormModel {
    public Age: number;
    public Gender: string;
    public OwnCarDrivingLicense: number;
    public FirstCar: number;
    public DriveTrainPreferred: string;
    public DriftingInterest: number;
    public BmwDrivenNumber: number;
    public BmwDrivenList: Array<string>;
    public isTargetableClient: boolean;

    constructor(){
        this.Age = 0;
        this.Gender = "";
        this.OwnCarDrivingLicense = 1;
        this.FirstCar = 1;
        this.DriveTrainPreferred = "";
        this.DriftingInterest = 1;
        this.BmwDrivenNumber = 0;
        this.BmwDrivenList = null;
        this.isTargetableClient = true;
    }
}

export interface DatabaseStructure {
    ListOfSurveys: Array<SurveyFormModel>;
}