export enum Project_Enum {
  STATUS_INIT = 1,
  STATUS_STOP = 5,
  STATUS_COMPLETE = 10,
  STATUS_DELETE = 99,
}

export const Project_Enum_Description: {
  [key in Project_Enum]: string;
} = {
  [Project_Enum.STATUS_INIT]: 'Pending',
  [Project_Enum.STATUS_STOP]: 'Stopped',
  [Project_Enum.STATUS_COMPLETE]: 'Completed',
  [Project_Enum.STATUS_DELETE]: 'Deleted',
};

export enum Mark_Enum {
  MARK_TYPE_RECT = 0,
  MARK_TYPE_CUT = 1,
  MARK_TYPE_POINT = 2,
}

export const Mark_Enum_Description: { [key in Mark_Enum]: string } = {
  [Mark_Enum.MARK_TYPE_RECT]: 'Rectangle',
  [Mark_Enum.MARK_TYPE_CUT]: 'Polygon',
  [Mark_Enum.MARK_TYPE_POINT]: 'Point',
};

export enum Category_Enum {
  CATEGORY_IMG = 1,
  CATEGORY_MOBILE = 2,
  CATEGORY_VR_MARK = 10,
  CATEGORY_AR_MARK = 20,
  CATEGORY_BAT = 30,
}

export const Category_Enum_Description: { [key in Category_Enum]: string } = {
  [Category_Enum.CATEGORY_IMG]: 'AI Manual Annotation',
  [Category_Enum.CATEGORY_MOBILE]: 'AR (Mobile) Annotation',
  [Category_Enum.CATEGORY_VR_MARK]: 'VR Annotation',
  [Category_Enum.CATEGORY_AR_MARK]: 'AR Annotation',
  [Category_Enum.CATEGORY_BAT]: 'Test Client',
};
