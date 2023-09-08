export interface ItemCategoryEntityInterface {
  _id?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class ItemCategoryEntity implements ItemCategoryEntityInterface {
  public _id?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(itemCategory: ItemCategoryEntityInterface) {
    this._id = itemCategory._id;
    this.name = itemCategory.name;
    this.createdAt = itemCategory.createdAt;
    this.updatedAt = itemCategory.updatedAt;
    this.createdBy_id = itemCategory.createdBy_id;
    this.updatedBy_id = itemCategory.updatedBy_id;
  }
}
