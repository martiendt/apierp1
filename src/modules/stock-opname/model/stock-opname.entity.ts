export interface ItemInterface {
  _id?: string;
  name?: string;
  size?: string;
  color?: string;
  quantity?: number;
  price?: number;
  total?: number;
}

export interface StockOpnameEntityInterface {
  _id?: string;
  received_id?: string;
  date?: string;
  warehouse_id?: string;
  items?: ItemInterface[];
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class StockOpnameEntity implements StockOpnameEntityInterface {
  public _id?: string;
  public received_id?: string;
  public date?: string;
  public warehouse_id?: string;
  public items?: ItemInterface[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(stockOpname: StockOpnameEntityInterface) {
    this._id = stockOpname._id;
    this.received_id = stockOpname.received_id;
    this.date = stockOpname.date;
    this.warehouse_id = stockOpname.warehouse_id;
    this.items = stockOpname.items;
    this.createdAt = stockOpname.createdAt;
    this.updatedAt = stockOpname.updatedAt;
    this.createdBy_id = stockOpname.createdBy_id;
    this.updatedBy_id = stockOpname.updatedBy_id;
  }
}
