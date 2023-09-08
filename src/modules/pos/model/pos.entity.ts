export interface sizeTypes {
  label?: string;
  quantity?: number;
}

export interface ItemInterface {
  _id?: string;
  name?: string;
  size?: string;
  quantity?: number;
  price?: number;
  total?: number;
}

export interface PosEntityInterface {
  _id?: string;
  date?: string;
  warehouse_id?: string;
  customer_id?: string;
  items?: ItemInterface[];
  totalQuantity?: number;
  subtotal?: number;
  discount?: number;
  totalPrice?: number;
  paymentType?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class PosEntity implements PosEntityInterface {
  public _id?: string;
  public date?: string;
  public warehouse_id?: string;
  public customer_id?: string;
  public items?: ItemInterface[];
  public totalQuantity?: number;
  public subtotal?: number;
  public discount?: number;
  public totalPrice?: number;
  public paymentType?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(pos: PosEntityInterface) {
    this._id = pos._id;
    this.date = pos.date;
    this.warehouse_id = pos.warehouse_id;
    this.customer_id = pos.customer_id;
    this.items = pos.items;
    this.totalQuantity = pos.totalQuantity;
    this.subtotal = pos.subtotal;
    this.discount = pos.discount;
    this.totalPrice = pos.totalPrice;
    this.paymentType = pos.paymentType;
    this.createdAt = pos.createdAt;
    this.updatedAt = pos.updatedAt;
    this.createdBy_id = pos.createdBy_id;
    this.updatedBy_id = pos.updatedBy_id;
  }
}
