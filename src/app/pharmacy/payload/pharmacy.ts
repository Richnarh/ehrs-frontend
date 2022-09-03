import { Base } from "src/app/payload/base";

export class Customer extends Base{
    clientType:string;
    customerName:string;
    phone:string;
    emailAddress:string;
    address:string;
    description:string;
}