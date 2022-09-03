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
}
export class Patient extends Base{
    fullname:string;
    opdNumber:string;
    gender:string;
    patientCategory:string;
    age:number;
    idType:string;
    idNumber:string;
    address:string;
}
export class PatientAddmission extends Base{
    patientName:string;
    patientId:string;
    labId:string;
    labName:string;
    admissionDate:Date;
    noOfDays:number;
    roomName:string;
    roomId:string;
}
export class LabTest extends Base{
    labName:string;
    labId:string;
    patientName:string;
    patientId:string;
    doctorName:string;
    doctorId:string;
    testDate:Date;  
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