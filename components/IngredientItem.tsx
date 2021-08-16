import { Box, Center, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { IngredientsState } from '../redux/reducer';

const IngredientItem = ({ ingredientId }: { ingredientId: number }) => {
  const ingredient = useSelector(
    (state: IngredientsState) => state.items[ingredientId],
  );

  const { image, name, aisle } = ingredient;

  const imageUrl = `https://spoonacular.com/cdn/ingredients_100x100/${image}`;

  return (
    <Center
      w="250px"
      h="250px"
      border="1px"
      borderRadius="10px"
      borderColor="#a3cef1"
      backgroundColor="#fff"
    >
      <Box d="flex" alignItems="center" flexDirection="column">
        <Image src={imageUrl} alt={name} maxWidth="100px" />
        <Heading as="p" size="md" textAlign="center" p="10px">
          {name}
        </Heading>

        <Heading as="p" size="xs" textAlign="center">
          {aisle}
        </Heading>
      </Box>
    </Center>
  );
};

export default IngredientItem;
