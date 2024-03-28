export interface CustomerGroupEntityInterface {
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class CustomerGroupEntity implements CustomerGroupEntityInterface {
  public _id?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(CustomerGroup: CustomerGroupEntityInterface) {
    this._id = CustomerGroup._id;
    this.name = CustomerGroup.name;
    this.createdAt = CustomerGroup.createdAt;
    this.updatedAt = CustomerGroup.updatedAt;
    this.createdBy_id = CustomerGroup.createdBy_id;
    this.updatedBy_id = CustomerGroup.updatedBy_id;
  }
}
