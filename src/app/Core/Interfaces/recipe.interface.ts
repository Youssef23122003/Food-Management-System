export interface Recipe {
  id: number;
  name: string;
  imagePath: string;
  description: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: Category[];
  tag: Category;
}

interface Category {
  id: number;
  name: string;
  creationDate: string;
  modificationDate: string;
}
