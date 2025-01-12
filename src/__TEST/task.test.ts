import test from 'ava';

import { categoryMapperProviderJohnDoe } from '../CategoryMappers/CompanyJohnDoeMapper';
import { CORRECT } from '../correctResult';
import { getCategories } from '../mockedApi';
import { categoryTree } from '../task';


test('should return the same result as currectResult', async (t) => {
  const categories = await getCategories();
  const result = categoryTree(categories.data, categoryMapperProviderJohnDoe);
  t.deepEqual(result, CORRECT)
});