import { Base } from "src/app/payload/base";

export class Patient extends Base{
    fullname:string;
    opdNumber:string;
    phoneNumber:string;
    gender:string;
    patientCategory:string;
    age:number;
    idType:string;
    idNumber:string;
    address:string;
    occupation:string;
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
export class AssignDr extends Base{
    doctor:string;
    doctorId:string;
    patientName:string;
    patientId:string;
    note:string;
}