const productsReducer = (state, action) => {
     switch (action.type) {
        case "API_DATA":
            return {
                ...state,
                products: [...state.products, action.payload]

            }
        case "ADD_TO_CART":
            const productExists = state.cartProducts.find(product => product.id === action.payload.id);
            
            return  (!productExists)? {...state, cartProducts: [...state.cartProducts, action.payload]} : state

        case "REMOVE_FROM_CART":
            const filteredUsers = state.cartProducts.filter(product => product.id !== action.payload);
            return {
                ...state,
                cartProducts: filteredUsers

            }
           
        case "PRODUCT_FILTER":
            return {
                ...state,
                products: [ action.payload]

            }
           
     
        default:
            break;
     }
}


export default productsReducer;