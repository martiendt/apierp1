export interface ItemInterface {
  description?: string;
  value?: number;
}

export interface BranchExpenseEntityInterface {
  _id?: string;
  date?: string;
  warehouse_id?: string;
  items?: ItemInterface[];
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class BranchExpenseEntity implements BranchExpenseEntityInterface {
  public _id?: string;
  public date?: string;
  public warehouse_id?: string;
  public items?: ItemInterface[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(stockCorrection: BranchExpenseEntityInterface) {
    this._id = stockCorrection._id;
    this.date = stockCorrection.date;
    this.warehouse_id = stockCorrection.warehouse_id;
    this.items = stockCorrection.items;
    this.createdAt = stockCorrection.createdAt;
    this.updatedAt = stockCorrection.updatedAt;
    this.createdBy_id = stockCorrection.createdBy_id;
    this.updatedBy_id = stockCorrection.updatedBy_id;
  }
}
