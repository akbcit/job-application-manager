import { User } from "./user.model";

export interface LoginResponse {
    userDetails:User,
    accessToken:string,
}