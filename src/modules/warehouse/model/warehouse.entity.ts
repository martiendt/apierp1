export interface WarehouseEntityInterface {
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class WarehouseEntity implements WarehouseEntityInterface {
  public _id?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(warehouse: WarehouseEntityInterface) {
    this._id = warehouse._id;
    this.name = warehouse.name;
    this.createdAt = warehouse.createdAt;
    this.updatedAt = warehouse.updatedAt;
    this.createdBy_id = warehouse.createdBy_id;
    this.updatedBy_id = warehouse.updatedBy_id;
  }
}
