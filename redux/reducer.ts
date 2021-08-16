import { Action, combineReducers } from 'redux';
import { fetchIngredientName, FetchIngredientsSuccessAction } from './action';
import keyBy from 'lodash/keyBy';

import { Ingredient } from '../interface/Ingredient';

export interface IngredientItemsState {
  [id: number]: Ingredient;
}

export interface IngredientListState {
  [query: string]: Ingredient;
}

const items = (state: IngredientItemsState = {}, action: Action<any>) => {
  if (action.type === fetchIngredientName.success) {
    const { payload } = action as FetchIngredientsSuccessAction;

    const ingrediens = keyBy(payload.data.results, 'id');

    return {
      ...state,
      ...ingrediens,
    };
  }
  return state;
};

const query = (state: string[] = [], action: Action<any>) => {
  if (action.type === fetchIngredientName.success) {
    const { payload } = action as FetchIngredientsSuccessAction;

    return [...state, payload.query];
  }
  return state;
};

const list = (state: IngredientListState = {}, action: Action<any>) => {
  if (action.type === fetchIngredientName.success) {
    const { payload } = action as FetchIngredientsSuccessAction;
    const query = payload.query;

    const list = payload.data.results.map((item) => item.id);

    return {
      ...state,
      [query]: list,
    };
  }

  return state;
};

const ingredientsReducer = combineReducers({
  items,
  list,
  query,
});

export type IngredientsState = ReturnType<typeof ingredientsReducer>;

export default ingredientsReducer;
