export enum UserStatusTypes {
  Active = "active",
  Suspended = "suspended",
}

export enum UserRolesTypes {
  Administrator = "administrator",
  AdminPurchasing = "admin purchasing",
  AdminStock = "admin stock",
  Cashier = "cashier",
}

export interface UserEntityInterface {
  _id?: string;
  warehouse_id?: string;
  name?: string;
  username?: string;
  password?: string;
  role?: UserRolesTypes;
  status?: UserStatusTypes;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class UserEntity implements UserEntityInterface {
  public _id?: string;
  public warehouse_id?: string;
  public name?: string;
  public username?: string;
  public password?: string;
  public role?: UserRolesTypes;
  public status?: UserStatusTypes;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(user: UserEntityInterface) {
    this._id = user._id;
    this.warehouse_id = user.warehouse_id;
    this.name = user.name;
    this.username = user.username;
    this.password = user.password;
    this.role = user.role;
    this.status = user.status;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.createdBy_id = user.createdBy_id;
    this.updatedBy_id = user.updatedBy_id;
  }
}
