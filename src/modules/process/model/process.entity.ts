export interface MachineEntityInterface {
  _id?: string;
  code?: string;
  name?: string;
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class MachineEntity implements MachineEntityInterface {
  public _id?: string;
  public code?: string;
  public name?: string;
  public notes?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(machine: MachineEntityInterface) {
    this._id = machine._id;
    this.code = machine.code;
    this.name = machine.name;
    this.notes = machine.notes;
    this.createdAt = machine.createdAt;
    this.updatedAt = machine.updatedAt;
    this.createdBy_id = machine.createdBy_id;
    this.updatedBy_id = machine.updatedBy_id;
  }
}
