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
    opdNumber:string;
    assignTime:string;
    assignDrStatus:string;
}
export class PatientVital extends Base{
    patientName:string;
    patientId:string;
    vitalDate:string;
    bp:string;
    temp:string;
    pulse:string;
    spTwo:string;
    weight:string;
    comment:string; 
    source:string; 
    physician:string; 
}
export class Prescription extends Base{
    drReport:string;
    drReportId:string;
    patient:string;
    patientId:string;
    stockReceiptItem:string;
    stockReceiptItemId:string;
    frequency:string;
    frequencyId:string;
    dose:string;
    notes:string;
}
export class DrReport extends Base{
    comment:string;
    patientId:string;
    assignPatient:string;
}