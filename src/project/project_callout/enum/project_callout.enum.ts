export enum Project_Callout_Type_AND_LEVEL {
  TYPE_PROJECT = 0,
  TYPE_SCENE = 1,
  LEVEL_CLASS = 1,
  LEVEL_GROUP = 2,
  LEVEL_ATTR = 3,
}

export const Project_Callout_Type_AND_LEVEL_Description: {
  [keys in Project_Callout_Type_AND_LEVEL]: string;
} = {
  [Project_Callout_Type_AND_LEVEL.TYPE_PROJECT]: 'project',
  [Project_Callout_Type_AND_LEVEL.TYPE_SCENE]: 'scene',
  // [Project_Callout_Type_AND_LEVEL.LEVEL_CLASS]: "kind", // Can't have same key twice
  [Project_Callout_Type_AND_LEVEL.LEVEL_GROUP]: 'Group',
  [Project_Callout_Type_AND_LEVEL.LEVEL_ATTR]: 'property',
};
