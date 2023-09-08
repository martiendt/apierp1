export interface sizeTypes {
  label?: string;
  quantity?: number;
}

export interface PurchaseEntityInterface {
  _id?: string;
  date?: string;
  warehouse_id?: string;
  supplier_id?: string;
  itemCategory_id?: string;
  item_id?: string;
  barcode?: string;
  name?: string;
  size?: sizeTypes[];
  color?: string;
  photoUrl?: string;
  totalQuantity?: number;
  price?: number;
  cargoPrice?: number;
  totalPrice?: number;
  profitMargin?: number;
  totalProfit?: number;
  totalSelling?: number;
  sellingPrice?: number;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class PurchaseEntity implements PurchaseEntityInterface {
  public _id?: string;
  public date?: string;
  public warehouse_id?: string;
  public supplier_id?: string;
  public itemCategory_id?: string;
  public item_id?: string;
  public barcode?: string;
  public name?: string;
  public size?: sizeTypes[];
  public color?: string;
  public photoUrl?: string;
  public totalQuantity?: number;
  public price?: number;
  public cargoPrice?: number;
  public totalPrice?: number;
  public profitMargin?: number;
  public totalProfit?: number;
  public totalSelling?: number;
  public sellingPrice?: number;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(purchase: PurchaseEntityInterface) {
    this._id = purchase._id;
    this.date = purchase.date;
    this.warehouse_id = purchase.warehouse_id;
    this.supplier_id = purchase.supplier_id;
    this.itemCategory_id = purchase.itemCategory_id;
    this.item_id = purchase.item_id;
    this.barcode = purchase.barcode;
    this.name = purchase.name;
    this.size = purchase.size;
    this.color = purchase.color;
    this.photoUrl = purchase.photoUrl;
    this.totalQuantity = purchase.totalQuantity;
    this.price = purchase.price;
    this.cargoPrice = purchase.cargoPrice;
    this.totalPrice = purchase.totalPrice;
    this.profitMargin = purchase.profitMargin;
    this.totalProfit = purchase.totalProfit;
    this.totalSelling = purchase.totalSelling;
    this.sellingPrice = purchase.sellingPrice;
    this.createdAt = purchase.createdAt;
    this.updatedAt = purchase.updatedAt;
    this.createdBy_id = purchase.createdBy_id;
    this.updatedBy_id = purchase.updatedBy_id;
  }
}
