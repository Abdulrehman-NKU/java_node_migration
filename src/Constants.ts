export const jwt_constants = {
  secret: '@SPUERNODENO1!',
};

export const CONSTANT = {
  TeamInviteCodeExpireCode: 'TeamInviteCodeExpire',

  TeamInviteCodeExpireDefaultVal: 259200,

  TeamCreateRoleIdCode: 'TeamCreateRoleId',

  TeamConventionalRoleIdCode: 'TeamConventionalRoleId',

  ProjectCreateRoleIdCode: 'ProjectCreateRoleId',

  ProjectConventionalRoleIdCode: 'ProjectConventionalRoleId',
};

export enum Role_Category {
  project_role = 1,
  team_role = 2,
  ordinary_user_role = 3,
}

export enum Roles {
  project_creator = 1,
  project_manager = 2,
  project_member = 10,
  ordinary_user = 11,
  team_creator = 12,
  team_admin = 13,
  team_member = 14,
}
