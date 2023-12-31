export interface CustomerEntityInterface {
  _id?: string;
  code?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
  bankBranch?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  creditLimit?: number;
}

export class CustomerEntity implements CustomerEntityInterface {
  public _id?: string;
  public code?: string;
  public name?: string;
  public address?: string;
  public phone?: string;
  public email?: string;
  public notes?: string;
  public bankBranch?: string;
  public bankName?: string;
  public accountName?: string;
  public accountNumber?: string;
  public creditLimit?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(customer: CustomerEntityInterface) {
    this._id = customer._id;
    this.code = customer.code;
    this.name = customer.name;
    this.address = customer.address;
    this.phone = customer.phone;
    this.email = customer.email;
    this.notes = customer.notes;
    this.bankBranch = customer.bankBranch;
    this.bankName = customer.bankName;
    this.accountName = customer.accountName;
    this.accountNumber = customer.accountNumber;
    this.creditLimit = customer.creditLimit;
    this.createdAt = customer.createdAt;
    this.updatedAt = customer.updatedAt;
    this.createdBy_id = customer.createdBy_id;
    this.updatedBy_id = customer.updatedBy_id;
  }
}
