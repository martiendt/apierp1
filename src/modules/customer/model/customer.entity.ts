export interface CustomerEntityInterface {
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

export class CustomerEntity implements CustomerEntityInterface {
  public _id?: string;
  public name?: string;
  public address?: string;
  public phone?: string;
  public email?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(customer: CustomerEntityInterface) {
    this._id = customer._id;
    this.name = customer.name;
    this.address = customer.address;
    this.phone = customer.phone;
    this.email = customer.email;
    this.createdAt = customer.createdAt;
    this.updatedAt = customer.updatedAt;
    this.createdBy_id = customer.createdBy_id;
    this.updatedBy_id = customer.updatedBy_id;
  }
}
