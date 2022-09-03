import { Base } from "src/app/payload/base";

export class LeaveRequest extends Base{
    leaveTypeName:string;
    leaveTypeId:string;
    departmentName:string;
    departmentId:string;
    periodFrom:Date;
    periodTo:Date;
    comment:string;
    totalLeaveDays:number;
    leaveStatus:string;
}