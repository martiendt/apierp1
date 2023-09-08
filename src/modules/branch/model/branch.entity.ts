export interface BranchEntityInterface {
  _id?: string;
  code?: string;
  name?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class BranchEntity implements BranchEntityInterface {
  public _id?: string;
  public code?: string;
  public name?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(branch: BranchEntityInterface) {
    this._id = branch._id;
    this.code = branch.code;
    this.name = branch.name;
    this.createdAt = branch.createdAt;
    this.updatedAt = branch.updatedAt;
    this.createdBy_id = branch.createdBy_id;
    this.updatedBy_id = branch.updatedBy_id;
  }
}
