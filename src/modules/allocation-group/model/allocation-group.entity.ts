export interface AllocationGroupEntityInterface {
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class AllocationGroupEntity implements AllocationGroupEntityInterface {
  public _id?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(AllocationGroup: AllocationGroupEntityInterface) {
    this._id = AllocationGroup._id;
    this.name = AllocationGroup.name;
    this.createdAt = AllocationGroup.createdAt;
    this.updatedAt = AllocationGroup.updatedAt;
    this.createdBy_id = AllocationGroup.createdBy_id;
    this.updatedBy_id = AllocationGroup.updatedBy_id;
  }
}
