export interface StudentRecord {
  name: string;
  email: string;
  age: string;
  grade: string;
}

export interface StudentRecordAugmented extends StudentRecord {
  _id: string;
}

