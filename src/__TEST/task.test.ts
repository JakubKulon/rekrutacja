import test from 'ava';

import { CORRECT } from '../correctResult';
import { getCategories } from '../mockedApi';
import { categoryTree } from '../task';
import { getCategoryOrder } from '../utils';


test('should return the same result as currectResult', async (t) => {
  const result = await categoryTree(getCategories)
  t.deepEqual(result, CORRECT)
});

test('should gives a number when include #', (t) => {
  t.is(getCategoryOrder('2#', 12), 2)
  t.is(getCategoryOrder('212#', 12123), 212)
})

test('should gives a number when include parsed string is real number', (t) => {
  t.is(getCategoryOrder('23', 14124), 23)
  t.is(getCategoryOrder('5', 2223), 5)
})

test('should returns a second fallbackNumber when first is not a number or does not include #', (t) => {
  t.is(getCategoryOrder('asd55', 77), 77)
  t.is(getCategoryOrder('five5', 812838), 812838)
  t.is(getCategoryOrder('notNumber', 91823), 91823)
  t.is(getCategoryOrder('512aqwe', 91823), 91823)
  t.is(getCategoryOrder('512a#qwe', 666823), 666823)
})
