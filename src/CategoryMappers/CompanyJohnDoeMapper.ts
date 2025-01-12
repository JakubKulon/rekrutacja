import { Category } from '../mockedApi';
import { CategoryListElement } from '../task';

export function categoryMapperProviderJohnDoe(
  category: Category,
  toShowOnHome: Set<number>
): CategoryListElement {
  const categoryTitle = category.Title;

  if (category.Title && category.Title.includes('#')) {
    toShowOnHome.add(category.id);
  }

  const categoryOrder: number = getCategoryOrder(categoryTitle, category.id);

  const children = category.hasChildren
    ? category.children.map((child) =>
        categoryMapperProviderJohnDoe(child, toShowOnHome)
      )
    : [];

  return {
    id: category.id,
    image: category.MetaTagDescription,
    name: category.name,
    order: categoryOrder,
    children: children.sort(
      (categoryA: CategoryListElement, categoryB: CategoryListElement) =>
        categoryA.order - categoryB.order
    ),
    showOnHome: false,
  };
}

export function getCategoryOrder(categoryTitle: string, categoryId: number) {
  if (categoryTitle.includes('#')) {
    //with replace method we can operate on more then one-digit digit (in comparision to string.split('#')[0])
    const parseIntWithoutHash = categoryTitle.replace('#', '');
    return isNumber(parseIntWithoutHash, categoryId);
  }

  return isNumber(categoryTitle, categoryId);
}

const isNumber = (str: string, fallbackNumber?: number) => {
  const parsed = parseFloat(str);
  if (
    !isNaN(parsed) &&
    isFinite(parsed) &&
    /^[+-]?(\d+(\.\d*)?|\.\d+)$/.test(str)
  ) {
    return parsed;
  }

  return fallbackNumber;
};
