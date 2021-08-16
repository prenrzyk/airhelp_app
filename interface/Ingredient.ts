export interface IngredientPossibleUnits {
  [key: number]: string;
}

export interface Ingredient {
  aisle: string;
  id: number;
  image: string;
  name: string;
  possibleUnits: IngredientPossibleUnits[];
}

export interface IngredientsResponse {
  offset: number;
  totalResults: number;
  number: string;
  results: Ingredient[];
}
