export interface CoaEntityInterface {
  _id?: string;
  type?: string;
  category?: string;
  name?: string;
  number?: string;
  increasing_in?: string;
  subledger?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class CoaEntity implements CoaEntityInterface {
  public _id?: string;
  public type?: string;
  public category?: string;
  public name?: string;
  public number?: string;
  public increasing_in?: string;
  public subledger?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(coa: CoaEntityInterface) {
    this._id = coa._id;
    this.type = coa.type;
    this.category = coa.category;
    this.name = coa.name;
    this.number = coa.number;
    this.increasing_in = coa.increasing_in;
    this.subledger = coa.subledger;
    this.createdAt = coa.createdAt;
    this.updatedAt = coa.updatedAt;
    this.createdBy_id = coa.createdBy_id;
    this.updatedBy_id = coa.updatedBy_id;
  }
}
