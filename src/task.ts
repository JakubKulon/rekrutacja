export interface CategoryListElement {
  name: string;
  id: number;
  image: string;
  order: number;
  children: CategoryListElement[];
  showOnHome: boolean;
}

interface CategoryMapper<T> {
  (item: T, toShowOnHome: Set<number>): CategoryListElement;
}

export const categoryTree = <T>(
  data: T[],
  categoryMapper: CategoryMapper<T>
): CategoryListElement[] => {
  if (!data || !data.length) {
    return [];
  }

  const categoriesToShowOnHomepage: Set<number> = new Set();

  const mappedCategories = data.map((item) =>
    categoryMapper(item, categoriesToShowOnHomepage)
  );

  const result = setCategoriesForHomepage(
    mappedCategories,
    categoriesToShowOnHomepage
  );

  return result;
};

export function setCategoriesForHomepage(
  result: CategoryListElement[],
  toShowOnHome: Set<number>
) {
  if (result.length <= 5) {
    return result.map((category) => ({ ...category, showOnHome: true }));
  }

  if (toShowOnHome.size > 0) {
    return result.map((category) => ({
      ...category,
      showOnHome: toShowOnHome.has(category.id),
    }));
  }

  return result.map((category, index) => ({
    ...category,
    showOnHome: index > 3,
  }));
}
