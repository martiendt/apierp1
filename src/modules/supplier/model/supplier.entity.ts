export interface SupplierEntityInterface {
  _id?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class SupplierEntity implements SupplierEntityInterface {
  public _id?: string;
  public name?: string;
  public address?: string;
  public phone?: string;
  public email?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(supplier: SupplierEntityInterface) {
    this._id = supplier._id;
    this.name = supplier.name;
    this.address = supplier.address;
    this.phone = supplier.phone;
    this.email = supplier.email;
    this.createdAt = supplier.createdAt;
    this.updatedAt = supplier.updatedAt;
    this.createdBy_id = supplier.createdBy_id;
    this.updatedBy_id = supplier.updatedBy_id;
  }
}
