export interface ExpeditionEntityInterface {
  _id?: string;
  code?: string;
  name?: string;
  address?: string;
  phone?: string;
  email?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class ExpeditionEntity implements ExpeditionEntityInterface {
  public _id?: string;
  public code?: string;
  public name?: string;
  public address?: string;
  public phone?: string;
  public email?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(expedition: ExpeditionEntityInterface) {
    this._id = expedition._id;
    this.code = expedition.code;
    this.name = expedition.name;
    this.address = expedition.address;
    this.phone = expedition.phone;
    this.email = expedition.email;
    this.createdAt = expedition.createdAt;
    this.updatedAt = expedition.updatedAt;
    this.createdBy_id = expedition.createdBy_id;
    this.updatedBy_id = expedition.updatedBy_id;
  }
}
