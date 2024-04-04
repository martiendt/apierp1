export interface SettingJournalEntityInterface {
  _id?: string;
  module?: string;
  coa_id?: string;
  account?: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy_id?: string;
  updatedBy_id?: string;
}

export class SettingJournalEntity implements SettingJournalEntityInterface {
  public _id?: string;
  public module?: string;
  public coa_id?: string;
  public account?: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  public createdBy_id?: string;
  public updatedBy_id?: string;

  constructor(settingJournal: SettingJournalEntityInterface) {
    this._id = settingJournal._id;
    this.module = settingJournal.module;
    this.coa_id = settingJournal.coa_id;
    this.account = settingJournal.account;
    this.createdAt = settingJournal.createdAt;
    this.updatedAt = settingJournal.updatedAt;
    this.createdBy_id = settingJournal.createdBy_id;
    this.updatedBy_id = settingJournal.updatedBy_id;
  }
}
