import { Category } from '../mockedApi';
import { CategoryListElement } from '../task';
import { getCategoryOrder } from '../utils';

 export function mapCategoryProviderJohn (category: Category, toShowOnHome: Set<number>): CategoryListElement {
    const categoryTitle = category.Title;
    
    if (category.Title && category.Title.includes("#")) {
     toShowOnHome.add(category.id)
    }
    
    const categoryOrder: number = getCategoryOrder(categoryTitle, category.id);

    const children =
      category.hasChildren 
        ? category.children.map((child) => mapCategoryProviderJohn(child, toShowOnHome))
        : []

    return {
      id: category.id,
      image: category.MetaTagDescription,
      name: category.name,
      order: categoryOrder,
      children: children.sort((categoryA: CategoryListElement, categoryB: CategoryListElement) => categoryA.order - categoryB.order),
      showOnHome: false,
    };
  };