export class User_Login_Response_DTO {
  UserId: string;
  account: string;
  userStatus: number;
  url?: string;
  rids?: string; // Role Id's separated by comma
  token: string;
}
