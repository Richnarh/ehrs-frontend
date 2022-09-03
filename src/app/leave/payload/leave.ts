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
export class SpecialLeave extends Base{
    employeeName:string;
    employeeId:string;
    maxNumberOfDays:number;
    leaveTypeName:string;
    leaveTypeId:string;
    purpose:string;
    description:string;
}