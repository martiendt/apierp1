export interface AllocationEntityInterface {
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class AllocationEntity implements AllocationEntityInterface {
  public _id?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(allocation: AllocationEntityInterface) {
    this._id = allocation._id;
    this.name = allocation.name;
    this.createdAt = allocation.createdAt;
    this.updatedAt = allocation.updatedAt;
    this.createdBy_id = allocation.createdBy_id;
    this.updatedBy_id = allocation.updatedBy_id;
  }
}
