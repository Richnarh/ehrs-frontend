import { Base } from "src/app/payload/base";

export class Employee extends Base{
    title:string
    jobRole:string;
    jobRoleId:string;
    firstname:string;
    middlename:string;
    lastname:string;
    emailAddress:string;
    phoneNumber:string;
    address:string;
    idType:string;
    idNumber:string;
    ssnitNo:string;
    departmentName:string;
    departmentId:string;
    canLogin:boolean;
}

export class LabResult extends Base{
    patientName:string;
    patientId:string;
    labTest:string;
    labTestId:string;
    testResult:string; 
}
export class Billing extends Base{
    billNo:string;
    patientName:string;
    patientId:string;
    doctorCharges:number;
    labCharges:number;
    roomCharges:number;
}