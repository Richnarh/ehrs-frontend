import { AppModule } from "./AppModule";

export interface AuthResponse{
    id:string;
    emailAddress:string;
    sessionId:string;
    appModuleList:AppModule[];
}