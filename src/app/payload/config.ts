import { Base } from "./base";

export class Department extends Base{
    departmentCode:string;
    departmentName:string;
    hodName:string
    hodId:string;
}
export class JobRole extends Base{
    roleName:string;
    description:string;
}
export class Lab extends Base{
    unitNo:string;
    unitName:string;
    unitHeadName:string;
    unitHeadId:string;
}
export class RoomType extends Base{
    wardName:string;
}
export class Room extends Base{
   wardNo:string;
   wardTypeName:string;
   wardTypeId:string;
   description:string;
}
export class LeaveType extends Base{
    leaveName:string;
    description:string;
}

export class PatientVital extends Base{
    patientName:string;
    patientId:string;
    vitalDate:string;
    bp:string
    temp:string
    pulse:string
    sp02:string;
    weight:string;
    comment:string;
}