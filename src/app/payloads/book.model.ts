export interface Book {
  id?: number;
  title: string;
  author: string;
  year: number;
  collection: string;
  cover?: string;
  nbFree: number;
  description: string;
}
