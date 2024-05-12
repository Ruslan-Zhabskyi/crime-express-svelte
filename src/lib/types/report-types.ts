export interface Session {
  name: string;
  _id: string;
  token: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  _id?: string;
}

export interface Category {
  categoryName: string;
  _id: string;
}

export interface Report {
  reportName: string;
  description: string;
  category: Category | string;
  reporter: User | string;
  lat: number;
  lng: number;
}

export interface DataSet {
  labels: string[];
  datasets: [{ values: number[] }];
}