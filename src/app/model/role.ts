export class RoleModel {
  id?: number = 0;
  name?: string = '';

  static getAppRoles() : string[] {
    return ['ADMIN', 'ROLE1', 'ROLE2'];
  }
}
