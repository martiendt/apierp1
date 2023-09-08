export interface ItemInterface {
  _id?: string;
  name?: string;
  size?: string;
  color?: string;
  quantity?: number;
  price?: number;
  total?: number;
}

export interface TransferItemEntityInterface {
  _id?: string;
  received_id?: string;
  date?: string;
  warehouseOrigin_id?: string;
  warehouseDestination_id?: string;
  items?: ItemInterface[];
  createdAt?: Date;
  updatedAt?: Date;
  receivedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
  receivedBy_id?: string;
}

export class TransferItemEntity implements TransferItemEntityInterface {
  public _id?: string;
  public received_id?: string;
  public date?: string;
  public warehouseOrigin_id?: string;
  public warehouseDestination_id?: string;
  public items?: ItemInterface[];
  public createdAt?: Date;
  public updatedAt?: Date;
  public receivedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;
  public receivedBy_id?: string;

  constructor(transferItem: TransferItemEntityInterface) {
    this._id = transferItem._id;
    this.received_id = transferItem.received_id;
    this.date = transferItem.date;
    this.warehouseOrigin_id = transferItem.warehouseOrigin_id;
    this.warehouseDestination_id = transferItem.warehouseDestination_id;
    this.items = transferItem.items;
    this.createdAt = transferItem.createdAt;
    this.receivedAt = transferItem.receivedAt;
    this.updatedAt = transferItem.updatedAt;
    this.createdBy_id = transferItem.createdBy_id;
    this.updatedBy_id = transferItem.updatedBy_id;
    this.receivedBy_id = transferItem.receivedBy_id;
  }
}
