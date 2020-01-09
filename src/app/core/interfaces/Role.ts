export interface Role {
    roleId: number;
    role: string;
  }
  
  export interface RoleResponse {
    statusCode: number;
    message: string;
    object: Array<Role>;
  }
  