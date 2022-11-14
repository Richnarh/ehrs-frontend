import { UserPage } from "./UserPage";

export interface AppModule{
    moduleId:string;
    moduleName:string;
    userPageData:UserPage[];
}