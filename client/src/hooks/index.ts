import { useQuery, useMutation } from '@apollo/react-hooks';
import { gql, ExecutionResult } from 'apollo-boost';
import { SelectedCategoryQuery } from './SelectedCategoryQuery';
import {
  BasketQuery,
  BasketQuery_basket_items as BasketItem,
} from './BasketQuery';
import {
  UpdateBasketMutation,
  UpdateBasketMutationVariables,
} from './UpdateBasketMutation';
import {
  CurrentUserQuery,
  CurrentUserQuery_user as User,
} from './CurrentUserQuery';

const selectedCategoryQuery = gql`
  query SelectedCategoryQuery {
    selectedCategory @client {
      id
      name
    }
  }
`;

export const useSelectedCategory = () => {
  const { data } = useQuery<SelectedCategoryQuery>(selectedCategoryQuery, {
    fetchPolicy: 'cache-first',
  });
  return data?.selectedCategory;
};

export const basketQuery = gql`
  query BasketQuery {
    basket @client {
      modificationCount
      items {
        productId
        quantity
      }
    }
  }
`;

const updateBasketMutation = gql`
  mutation UpdateBasketMutation($productId: ID!, $quantity: Int!) {
    updateBasket(productId: $productId, quantity: $quantity) @client {
      productId
      quantity
    }
  }
`;

export const useBasket = (): [
  BasketItem[],
  (
    productId: string,
    quantity: number
  ) => Promise<ExecutionResult<UpdateBasketMutation>>,
  number
] => {
  const { data } = useQuery<BasketQuery>(basketQuery);
  const [mutate] = useMutation<
    UpdateBasketMutation,
    UpdateBasketMutationVariables
  >(updateBasketMutation);
  return [
    data?.basket.items || [],
    (productId: string, quantity: number) =>
      mutate({ variables: { productId, quantity } }),
    data?.basket.modificationCount || 0,
  ];
};

export const useToken = (): [string | undefined, (token?: string) => void] => {
  return [
    window.localStorage.getItem('token') || undefined,
    token =>
      token
        ? window.localStorage.setItem('token', token)
        : window.localStorage.removeItem('token'),
  ];
};

const currentUserQuery = gql`
  query CurrentUserQuery {
    user {
      id
      email
      billingAddress {
        firstName
        lastName
        companyName
        street
        zipCode
        city
        country
      }
      shippingAddress {
        firstName
        lastName
        companyName
        street
        zipCode
        city
        country
      }
    }
  }
`;

export const useCurrentUser = (): [User | undefined, string | undefined] => {
  const { data, error } = useQuery<CurrentUserQuery>(currentUserQuery, {
    fetchPolicy: 'cache-first',
  });
  return [data?.user || undefined, error?.graphQLErrors[0].message];
};
