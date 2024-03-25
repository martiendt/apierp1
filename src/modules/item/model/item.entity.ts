export interface ItemEntityInterface {
  _id?: string;
  code?: string;
  name?: string;
  unit?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class ItemEntity implements ItemEntityInterface {
  public _id?: string;
  public code?: string;
  public name?: string;
  public unit?: string;
  public notes?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(item: ItemEntityInterface) {
    this._id = item._id;
    this.code = item.code;
    this.name = item.name;
    this.unit = item.unit;
    this.notes = item.notes;
    this.createdAt = item.createdAt;
    this.updatedAt = item.updatedAt;
    this.createdBy_id = item.createdBy_id;
    this.updatedBy_id = item.updatedBy_id;
  }
}
