export interface InventoryEntityInterface {
  _id?: string;
  warehouse_id?: string;
  item_id?: string;
  size?: string;
  color?: string;
  quantity?: number;
  reference?: string;
  reference_id?: string;
  createdAt?: Date;
}

export class InventoryEntity implements InventoryEntityInterface {
  public _id?: string;
  public warehouse_id?: string;
  public item_id?: string;
  public size?: string;
  public color?: string;
  public quantity?: number;
  public createdAt?: Date;
  public reference?: string;
  public reference_id?: string;

  constructor(inventory: InventoryEntityInterface) {
    this._id = inventory._id;
    this.warehouse_id = inventory.warehouse_id;
    this.item_id = inventory.item_id;
    this.size = inventory.size;
    this.color = inventory.color;
    this.quantity = inventory.quantity;
    this.reference = inventory.reference;
    this.reference_id = inventory.reference_id;
    this.createdAt = inventory.createdAt;
  }
}
