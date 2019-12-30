import React from 'react';
import { useBasket } from './hooks';
import { BasketQuery_basket_items as BasketItem } from './hooks/BasketQuery';
import { useApolloClient } from '@apollo/react-hooks';

const BasketPersister: React.FC = () => {
  const [basket, , modificationCount] = useBasket();
  const client = useApolloClient();
  if (modificationCount === 0) {
    // restore basket
    const persistedBasket: BasketItem[] = JSON.parse(
      window.localStorage.getItem('basket') || '[]'
    );
    client.writeData({
      data: {
        selectedCategory: null,
        basket: {
          __typename: 'Basket',
          modificationCount: 1,
          items: persistedBasket,
        },
      },
    });
  } else {
    // persist basket
    window.localStorage.setItem('basket', JSON.stringify(basket));
  }
  return null;
};

export default BasketPersister;
