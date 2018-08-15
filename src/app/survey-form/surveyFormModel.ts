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
        this.OwnCarDrivingLicense = 0;
        this.FirstCar = 0;
        this.DriveTrainPreferred = "";
        this.DriftingInterest = 0;
        this.BmwDrivenNumber = 0;
        this.BmwDrivenList = null;
        this.isTargetableClient = true;
    }
}