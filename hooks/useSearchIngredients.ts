import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { IngredientsResponse } from '../interface/Ingredient';
import { fetchIngredientActions } from '../redux/action';
import useDebouncedField from './useDebouncedField';
import { IngredientsState } from '../redux/reducer';

const API_KEY = process.env.SPOONACULAR_API_KEY as string;

const useSearchIngredients = () => {
  const [pending, setPending] = useState<boolean>(false);
  const [ingredient, ingredientFilter, setIngredient] = useDebouncedField('');
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const handleChangeIngredient = (e: any) => {
    const inputValue = e.target.value;
    setIngredient(inputValue.toLocaleLowerCase());
  };

  const handleFetchIngredients = async () => {
    try {
      setPending(true);
      dispatch(fetchIngredientActions.request());
      const response = await axios.get<IngredientsResponse[]>(
        'https://api.spoonacular.com/food/ingredients/search',
        {
          params: {
            apiKey: API_KEY,
            number: 10,
            query: ingredientFilter,
            metaInformation: true,
          },
        },
      );

      dispatch(
        fetchIngredientActions.success({
          data: response.data,
          query: ingredientFilter,
        }),
      );
      setPending(false);
    } catch (error) {
      setPending(false);

      dispatch(fetchIngredientActions.failure({ error: error }));
      setError(error.message);
    }
  };
  const ingredients = useSelector((state: IngredientsState) => state.list);
  const ingredientsQuery = useSelector(
    (state: IngredientsState) => state.query,
  );

  const duplicateIngredient = Object.keys(ingredients).find(
    (item) => item === ingredientFilter,
  );

  useEffect(() => {
    if (ingredientFilter === '' || duplicateIngredient) {
      return;
    }
    handleFetchIngredients();
  }, [ingredientFilter]);

  return {
    pending,
    ingredient,
    handleChangeIngredient,
    setIngredient,
    ingredients,
    ingredientsQuery,
    error,
  };
};

export default useSearchIngredients;
