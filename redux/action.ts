import { createAction } from 'redux-actions';
import { ActionCreator } from 'redux';
import { IngredientsResponse } from '../interface/Ingredient';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type AsyncNames<T extends string> = {
  // eslint-disable-next-line prettier/prettier
  request: string;
  success: string;
  failure: string;
  cancel: string;
};

export const asyncNames = <T extends string>(baseName: T) => {
  return {
    request: `${baseName}_REQUEST`,
    success: `${baseName}_SUCCESS`,
    failure: `${baseName}_FAILURE`,
    cancel: `${baseName}_CANCEL`,
  } as AsyncNames<T>;
};

export type ActionNames = { [key: string]: string };

type AsyncActions<T> = {
  [Key in keyof T]: ActionCreator<T[Key]>;
};

export const createActions = <T extends ActionNames>(names: T) => {
  const actions: {
    [key in keyof T]?: ActionCreator<any>;
  } = {};
  Object.keys(names).forEach((key: keyof T) => {
    actions[key] = createAction(names[key]);
  });
  return actions as AsyncActions<T>;
};

export const fetchIngredientName = asyncNames('FETCH_INGREDIENT');

export const fetchIngredientActions = createActions(fetchIngredientName);

export interface FetchIngredientsSuccessAction {
  type: typeof fetchIngredientName.success;
  payload: {
    data: IngredientsResponse;
    query: string;
  };
}
