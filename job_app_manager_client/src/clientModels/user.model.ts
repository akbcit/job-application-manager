export interface User {
  firstName: string;
  lastName?: string;
  signUpDate: Date;
  source: string;
  pictureUrl?: string;
  email: string;
  isFirstLogin?:boolean;
}
