import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Center,
  CircularProgress,
  Heading,
  HStack,
  SimpleGrid,
  Tag,
  Textarea,
  useMediaQuery,
} from '@chakra-ui/react';
import useSearchIngredients from '../hooks/useSearchIngredients';
import IngredientItem from './IngredientItem';

const Ingredients = () => {
  const {
    ingredients,
    ingredient,
    handleChangeIngredient,
    setIngredient,
    ingredientsQuery,
    error,
    pending,
  } = useSearchIngredients();
  const [isLargerThan1280] = useMediaQuery('(min-width: 1280px)');

  const ingredientsByQuery = ingredients[ingredient] as number[];

  const getColumns = () => {
    if (isLargerThan1280) {
      return 4;
    }

    return 1;
  };

  return (
    <Box bg="#ede7e3" w="100%" minHeight="100vh" p={4} color="#16697a">
      {error && (
        <Center>
          <Alert status="error" w="512px">
            <AlertIcon />
            <AlertTitle mr={2}>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </Center>
      )}
      <Center>
        <Heading as="h2" size="2xl" isTruncated p="20px 20px 40px 20px">
          AirHelp - ingredients search :)
        </Heading>
      </Center>
      <Center>
        <Box bg="#fff" w={512} borderRadius="lg">
          <Textarea
            value={ingredient}
            onChange={handleChangeIngredient}
            placeholder="Enter your ingredient"
            minH={50}
            maxH={50}
            textAlign="center"
            fontSize={20}
          />
        </Box>
      </Center>

      {ingredientsQuery.length > 0 && (
        <Box
          d="flex"
          maxWidth={1440}
          m="0 auto"
          flexDirection="column"
          justifyContent="center"
          p="20px"
        >
          <Center>
            <Heading as="p" size="m">
              Recent search results:
            </Heading>
          </Center>
          <HStack
            spacing={isLargerThan1280 ? 4 : 0}
            flexDirection={isLargerThan1280 ? 'row' : 'column'}
            justifyContent="center"
            marginTop={isLargerThan1280 ? '20px' : '10px'}
          >
            {ingredientsQuery
              .slice(Math.max(ingredientsQuery.length - 10, 0))
              .map((item) => (
                <Tag
                  minWidth="100px"
                  border="1px"
                  borderRadius="10px"
                  borderColor="#a3cef1"
                  backgroundColor="#fff"
                  onClick={() => setIngredient(item)}
                  key={item}
                  size="md"
                  d="flex"
                  justifyContent="center"
                >
                  {item}
                </Tag>
              ))}
          </HStack>
        </Box>
      )}

      {pending && (
        <Center>
          <CircularProgress isIndeterminate marginTop="30px" />
        </Center>
      )}

      {!pending && ingredientsByQuery && (
        <Box d="flex" justifyContent="center" maxWidth={1440} m="0 auto">
          {ingredientsByQuery.length > 0 ? (
            <SimpleGrid
              columns={getColumns()}
              spacing={20}
              justifyContent="center"
            >
              {ingredientsByQuery.map((ingredient) => {
                return (
                  <IngredientItem ingredientId={ingredient} key={ingredient} />
                );
              })}
            </SimpleGrid>
          ) : (
            <Center>
              <Heading as="p" size="m" marginTop="60px">
                No ingredients
              </Heading>
            </Center>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Ingredients;
