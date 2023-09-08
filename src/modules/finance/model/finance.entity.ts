export interface FinanceEntityInterface {
  _id?: string;
  date?: string;
  description?: string;
  value?: number;
  reference?: string;
  reference_id?: string;
  createdAt?: Date;
}

export class FinanceEntity implements FinanceEntityInterface {
  public _id?: string;
  public date?: string;
  public description?: string;
  public value?: number;
  public createdAt?: Date;
  public reference?: string;
  public reference_id?: string;

  constructor(finance: FinanceEntityInterface) {
    this._id = finance._id;
    this.date = finance.date;
    this.description = finance.description;
    this.value = finance.value;
    this.reference = finance.reference;
    this.reference_id = finance.reference_id;
    this.createdAt = finance.createdAt;
  }
}
