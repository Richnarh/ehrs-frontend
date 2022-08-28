import { Base } from "./Base";

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
    roomName:string;
}
export class Room extends Base{
   roomNo:string;
   roomTypeName:string;
   roomTypeId:string;
   description:string;
}