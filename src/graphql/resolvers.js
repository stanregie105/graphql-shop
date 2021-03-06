import {gql} from 'apollo-boost';
import {AddItemToCart} from './cart.utils';

export const typeDefs = gql`

  extend type Item:{
      quantity: Int
  }
   extend type Mutation {
       ToggleCartHidden: Boolean!,
       AddItemToCart:(item: Item!): [Item]!
   }
`;

const GET_CART_ITEMS = gql`
  {
      cartItems @client
  }
`;

const GET_CART_HIDDEN = gql`
  {
      cartHidden @client
  }
`;

export const resolvers ={
    Mutation: {
      toogleCartHidden: (_root, _args, {cache})=>{
         const {cartHidden} = cache.readQuery({
             query: GET_CART_HIDDEN
             
         });

         cache.writeQuery({
             query: GET_CART_HIDDEN,
             data: { cartHidden: !cartHidden}
         })
         return !cartHidden;
      },
      addItemToCart :(_root, { item}, {cache})=>{
          const {cartItems} = cache.readQuery({
             
             query: GET_CART_ITEMS
          });
          
        const newCartItem = addItemToCart(cartItems, item);

        cache.writeQuery({
            query: GET_CART_ITEMS,
            data: { cartItems: newCartItem}
        });
        return newCartItem;
      }
    }
}