import type { NextPage } from 'next';
import Ingredients from '../components/Ingredients';
import { ChakraProvider } from '@chakra-ui/react';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import Head from 'next/head';
import ingredientsReducer from '../redux/reducer';

const Home: NextPage = () => {
  const composeEnhancers =
    typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
      : compose;

  const enhancer = composeEnhancers(applyMiddleware(ReduxThunk));
  const store = createStore(ingredientsReducer, enhancer);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Head>
          <title>AirHelp ingredients search</title>
          <meta
            name="ingredients search"
            content="AirHelp ingredients search"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Ingredients />
      </ChakraProvider>
    </Provider>
  );
};

export default Home;
