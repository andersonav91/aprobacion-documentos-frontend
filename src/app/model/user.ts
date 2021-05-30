export class UserModel {
  email?: string = '';
  password?: string = '';
  username?: string = '';
  name?: string = '';
  usersRoles: any[] = [];
  token?: string = '';

  constructor() {
  }

  hasValidRole(roles: string[]) {
    if(roles.some(role => {return role.toLowerCase() == 'all'})) {
      return true;
    }
    let userRoles = this.usersRoles.map(obj => {
      return obj.role.name;
    });
    return (userRoles.filter(obj => {
      return roles.some(role => {
        return role.toLowerCase() == obj.toString().toLowerCase()
      });
    }).length > 0);
  }
}
