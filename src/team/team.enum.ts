export enum Team_Status {
  init = 1,
  delete = 99,
}

export const Team_Status_Description: { [key in Team_Status]: string } = {
  [Team_Status.init]: 'valid',
  [Team_Status.delete]: 'Disbanded',
};

export enum Team_Invite_Code {
  Code = 1,
  LinkUrl = 2,
}

export const Team_Invite_Code_Description: {
  [key in Team_Invite_Code]: string;
} = {
  [Team_Invite_Code.Code]: 'Verification code',
  [Team_Invite_Code.LinkUrl]: 'Connection verification code',
};
