export enum Team_Status {
  init = 1,
  delete = 99,
}

export const Team_Status_Description: { [key in Team_Status]: string } = {
  [Team_Status.init]: 'valid',
  [Team_Status.delete]: 'Disbanded',
};
