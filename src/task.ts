import { Category } from './mockedApi';
import { mapCategory, setCategoriesForHomepage } from './utils';

export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}

export interface GetDataArg {
  (): Promise<{ data: Category[] } | null>;
}

export const categoryTree = async (
  getData: GetDataArg
): Promise<CategoryListElement[]> => {
  const res = await getData();

  if (!res.data) {
    return [];
  }

  const toShowOnHome: Set<number> = new Set

  const mappedCategories = res.data.map((category) => mapCategory(category, toShowOnHome))

  const result = setCategoriesForHomepage(mappedCategories, toShowOnHome);
 
  return result
};

