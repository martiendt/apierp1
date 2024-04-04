export interface SettingJournalEntityInterface {
  _id?: string;
  type?: string;
  category?: string;
  name?: string;
  number?: string;
  increasing_in?: string;
  subledger?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class SettingJournalEntity implements SettingJournalEntityInterface {
  public _id?: string;
  public type?: string;
  public category?: string;
  public name?: string;
  public number?: string;
  public increasing_in?: string;
  public subledger?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(settingJournal: SettingJournalEntityInterface) {
    this._id = settingJournal._id;
    this.type = settingJournal.type;
    this.category = settingJournal.category;
    this.name = settingJournal.name;
    this.number = settingJournal.number;
    this.increasing_in = settingJournal.increasing_in;
    this.subledger = settingJournal.subledger;
    this.createdAt = settingJournal.createdAt;
    this.updatedAt = settingJournal.updatedAt;
    this.createdBy_id = settingJournal.createdBy_id;
    this.updatedBy_id = settingJournal.updatedBy_id;
  }
}
