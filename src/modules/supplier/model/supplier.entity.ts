export interface SupplierEntityInterface {
  _id?: string;
  code?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  notes?: string;
  bankBranch?: string;
  bankName?: string;
  accountName?: string;
  accountNumber?: string;
  creditLimit?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class SupplierEntity implements SupplierEntityInterface {
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

  constructor(supplier: SupplierEntityInterface) {
    this._id = supplier._id;
    this.code = supplier.code;
    this.name = supplier.name;
    this.address = supplier.address;
    this.phone = supplier.phone;
    this.email = supplier.email;
    this.notes = supplier.notes;
    this.bankBranch = supplier.bankBranch;
    this.bankName = supplier.bankName;
    this.accountName = supplier.accountName;
    this.accountNumber = supplier.accountNumber;
    this.creditLimit = supplier.creditLimit;
    this.createdAt = supplier.createdAt;
    this.updatedAt = supplier.updatedAt;
    this.createdBy_id = supplier.createdBy_id;
    this.updatedBy_id = supplier.updatedBy_id;
  }
}
