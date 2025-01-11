import { setCategoriesForHomepage } from './utils';

export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}

interface CategoryMapperArg<T> {
  (item: T, toShowOnHome: Set<number>): CategoryListElement;
}

export const categoryTree = <T>(
  data: T[], categoryMapper: CategoryMapperArg<T>
): CategoryListElement[] => {
  if (!data || !data.length) {
    return [];
  }

  const toShowOnHome: Set<number> = new Set();

  const mappedCategories = data.map((item) => categoryMapper(item, toShowOnHome));

  const result = setCategoriesForHomepage(mappedCategories, toShowOnHome);
 
  return result;
};


