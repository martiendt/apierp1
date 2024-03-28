export interface SupplierGroupEntityInterface {
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class SupplierGroupEntity implements SupplierGroupEntityInterface {
  public _id?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(SupplierGroup: SupplierGroupEntityInterface) {
    this._id = SupplierGroup._id;
    this.name = SupplierGroup.name;
    this.createdAt = SupplierGroup.createdAt;
    this.updatedAt = SupplierGroup.updatedAt;
    this.createdBy_id = SupplierGroup.createdBy_id;
    this.updatedBy_id = SupplierGroup.updatedBy_id;
  }
}
