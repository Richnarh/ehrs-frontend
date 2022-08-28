import { Base } from "src/app/payload/Base";

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